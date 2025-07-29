const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const qrcode = require('qrcode-terminal')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// FastAPI URL - usando Railway private domain em produção, localhost em dev
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8001'
const PORT = process.env.PORT || 3001

console.log('🔗 FastAPI URL configured:', FASTAPI_URL)
console.log('🚀 WhatsApp Service will run on port:', PORT)

let sock = null
let qrCode = null
let connectionStatus = 'disconnected'

async function initWhatsApp() {
    try {
        console.log('🚀 Iniciando serviço WhatsApp...')
        
        const { state, saveCreds } = await useMultiFileAuthState('auth_info')

        sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            browser: ['CRM Turbo', 'Chrome', '1.0.0'],
            markOnlineOnConnect: true
        })

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update

            if (qr) {
                qrCode = qr
                connectionStatus = 'qr_generated'
                console.log('📱 QR Code gerado - Escaneie com seu WhatsApp')
                qrcode.generate(qr, { small: true })
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
                console.log('❌ Conexão fechada:', lastDisconnect?.error, ', reconectando:', shouldReconnect)
                
                connectionStatus = 'disconnected'
                qrCode = null

                if (shouldReconnect) {
                    setTimeout(initWhatsApp, 5000)
                }
            } else if (connection === 'open') {
                console.log('✅ WhatsApp conectado com sucesso!')
                console.log('📞 Número conectado:', sock.user?.id)
                connectionStatus = 'connected'
                qrCode = null
            } else if (connection === 'connecting') {
                console.log('🔄 Conectando ao WhatsApp...')
                connectionStatus = 'connecting'
            }
        })

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                for (const message of messages) {
                    if (!message.key.fromMe && message.message) {
                        await handleIncomingMessage(message)
                    }
                }
            }
        })

        sock.ev.on('creds.update', saveCreds)

    } catch (error) {
        console.error('❌ Erro na inicialização do WhatsApp:', error)
        connectionStatus = 'error'
        setTimeout(initWhatsApp, 10000)
    }
}

async function handleIncomingMessage(message) {
    try {
        const phoneNumber = message.key.remoteJid.replace('@s.whatsapp.net', '')
        const messageText = message.message.conversation ||
                           message.message.extendedTextMessage?.text || ''

        console.log(`📨 Mensagem recebida de ${phoneNumber}: ${messageText}`)

        // Enviar mensagem para FastAPI para processamento
        const response = await axios.post(`${FASTAPI_URL}/api/whatsapp/message`, {
            phone_number: phoneNumber,
            message: messageText,
            message_id: message.key.id,
            timestamp: message.messageTimestamp || Math.floor(Date.now() / 1000)
        }, {
            timeout: 10000, // 10 segundos timeout
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // Enviar resposta de volta para WhatsApp se FastAPI retornar uma
        if (response.data.reply) {
            console.log(`📤 Enviando resposta para ${phoneNumber}`)
            await sendMessage(phoneNumber, response.data.reply)
        }

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error.message)
        
        // Enviar mensagem de erro para o usuário
        try {
            const phoneNumber = message.key.remoteJid.replace('@s.whatsapp.net', '')
            await sendMessage(phoneNumber, 'Desculpe, houve um erro temporário. Tente novamente em alguns minutos.')
        } catch (sendError) {
            console.error('❌ Erro ao enviar mensagem de erro:', sendError)
        }
    }
}

async function sendMessage(phoneNumber, text) {
    try {
        if (!sock || connectionStatus !== 'connected') {
            throw new Error('WhatsApp não está conectado')
        }

        const jid = phoneNumber.includes('@') ? phoneNumber : `${phoneNumber}@s.whatsapp.net`
        
        await sock.sendMessage(jid, { text })
        console.log(`✅ Mensagem enviada para ${phoneNumber}`)
        
        return { success: true }

    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error.message)
        return { success: false, error: error.message }
    }
}

// API REST endpoints
app.get('/qr', async (req, res) => {
    try {
        res.json({ 
            qr: qrCode || null,
            status: connectionStatus
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/send', async (req, res) => {
    const { phone_number, message } = req.body
    
    if (!phone_number || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'phone_number e message são obrigatórios' 
        })
    }
    
    const result = await sendMessage(phone_number, message)
    res.json(result)
})

app.get('/status', (req, res) => {
    res.json({
        connected: connectionStatus === 'connected',
        status: connectionStatus,
        user: sock?.user || null
    })
})

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        service: 'whatsapp-service',
        connection: connectionStatus,
        timestamp: new Date().toISOString()
    })
})

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('🛑 Encerrando serviço WhatsApp...')
    if (sock) {
        await sock.logout()
    }
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('🛑 Encerrando serviço WhatsApp...')
    if (sock) {
        await sock.logout()
    }
    process.exit(0)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serviço WhatsApp rodando na porta ${PORT}`)
    console.log(`🔗 FastAPI URL: ${FASTAPI_URL}`)
    console.log('📱 WhatsApp Service pronto para conexão!')
    console.log('---')
    initWhatsApp()
})