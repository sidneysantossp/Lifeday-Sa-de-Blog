import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8">Política de Privacidade</h1>
        <div className="prose prose-stone prose-lg max-w-none text-stone-600">
          <p className="mb-4">Última atualização: Janeiro de 2026</p>
          
          <p>
            No <strong>Lifeday Saúde</strong>, a sua privacidade é uma prioridade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais que você nos fornece ao utilizar nosso site.
          </p>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">1. Coleta de Informações</h3>
          <p>
            Podemos coletar informações pessoais, como nome e endereço de e-mail, apenas quando voluntariamente submetidas por nossos visitantes (por exemplo, ao assinar nossa newsletter). Também coletamos dados não pessoais automaticamente, como tipo de navegador e páginas visitadas, para melhorar a experiência do usuário.
          </p>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">2. Uso das Informações</h3>
          <p>
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enviar nossa newsletter semanal com curadoria de conteúdo (caso você tenha optado por receber).</li>
            <li>Melhorar nosso conteúdo editorial com base nos interesses dos leitores.</li>
            <li>Responder a dúvidas ou comentários enviados através dos nossos canais de contato.</li>
          </ul>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">3. Proteção de Dados</h3>
          <p>
            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado. Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem o seu consentimento.
          </p>
          
          <h3 className="text-stone-900 font-bold mt-8 mb-4">4. Cookies</h3>
          <p>
            Utilizamos cookies para entender e salvar suas preferências para visitas futuras. Você pode optar por desativar os cookies nas configurações do seu navegador.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 animate-in fade-in duration-500 min-h-screen bg-white">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8">Termos de Uso</h1>
        <div className="prose prose-stone prose-lg max-w-none text-stone-600">
          <p className="mb-4">Última atualização: Janeiro de 2026</p>

          <p>
            Bem-vindo ao <strong>Lifeday Saúde</strong>. Ao acessar este site, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.
          </p>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">1. Isenção de Responsabilidade (Disclaimer)</h3>
          <div className="bg-stone-50 border-l-4 border-emerald-500 p-6 my-6 rounded-r-lg">
             <p className="font-bold text-stone-900 mb-2">Importante:</p>
             <p className="text-sm">
               O conteúdo deste site é apenas para fins informativos, educacionais e de entretenimento. <strong>Nós somos um grupo de entusiastas, escritores e pesquisadores, e não profissionais de saúde licenciados.</strong> Nenhuma informação aqui contida substitui o aconselhamento, diagnóstico ou tratamento profissional. Sempre procure o conselho de profissionais qualificados para qualquer dúvida relacionada a uma condição de saúde.
             </p>
          </div>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">2. Propriedade Intelectual</h3>
          <p>
            Todo o conteúdo publicado neste site (textos, imagens, logotipos) é de propriedade do Lifeday Saúde ou de seus criadores de conteúdo e é protegido por leis de direitos autorais. O uso não autorizado do material pode violar leis de propriedade intelectual.
          </p>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">3. Conduta do Usuário</h3>
          <p>
            Esperamos que nossos leitores mantenham um ambiente de respeito e cordialidade nos comentários e interações. Reservamo-nos o direito de remover comentários que sejam ofensivos, discriminatórios ou spam.
          </p>

          <h3 className="text-stone-900 font-bold mt-8 mb-4">4. Links Externos</h3>
          <p>
            Nosso site pode conter links para sites externos que não são operados por nós. Não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};