const axios = require('axios');

async function debugWhatsApp() {
    console.log('🔍 Diagnóstico do WhatsApp Service...\n');
    
    try {
        // Verificar se o serviço está respondendo
        console.log('1. Verificando se o serviço está rodando...');
        const health = await axios.get('http://localhost:3001/health');
        console.log('✅ Serviço respondendo:', health.data);
        
        // Verificar status da conexão
        console.log('\n2. Verificando status da conexão...');
        const status = await axios.get('http://localhost:3001/status');
        console.log('📊 Status:', status.data);
        
        // Verificar QR code
        console.log('\n3. Verificando QR code...');
        const qr = await axios.get('http://localhost:3001/qr');
        console.log('📱 QR Code:', qr.data);
        
        // Testar envio de mensagem
        console.log('\n4. Testando envio de mensagem...');
        try {
            const sendTest = await axios.post('http://localhost:3001/send', {
                phone_number: '558592176713',
                message: 'Teste de diagnóstico - ' + new Date().toISOString()
            });
            console.log('📤 Resultado do envio:', sendTest.data);
        } catch (sendError) {
            console.log('❌ Erro no envio:', sendError.response?.data || sendError.message);
        }
        
    } catch (error) {
        console.log('❌ Erro no diagnóstico:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 O serviço WhatsApp não está rodando na porta 3001');
        }
    }
}

debugWhatsApp(); 