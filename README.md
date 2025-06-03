<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<div align="center">
  <h1>Sistema de Gerenciamento de Clientes</h1>
  <p>Aplicação full-stack com backend em Laravel e frontend em Next.js</p>
</div>

<div>
  <h2>📋 Funcionalidades</h2>
  <ul>
    <li>Autenticação de usuários (login/registro)</li>
    <li>CRUD completo de clientes</li>
    <li>Dashboard administrativo</li>
    <li>API RESTful</li>
  </ul>

  <h2>🛠️ Tecnologias</h2>
  <h3>Backend</h3>
  <ul>
    <li>PHP 8.x</li>
    <li>Laravel 10.x</li>
    <li>MySQL</li>
    <li>Sanctum (Autenticação API)</li>
  </ul>

  <h3>Frontend</h3>
  <ul>
    <li>Next.js</li>
    <li>React 18</li>
    <li>Axios para requisições HTTP</li>
    <li>Context API para gerenciamento de estado</li>
  </ul>

  <h2>🚀 Começando</h2>
  <h3>Pré-requisitos</h3>
  <ul>
    <li>PHP >= 8.2</li>
    <li>Composer</li>
    <li>Node.js >= 16.x</li>
    <li>MySQL >= 5.7</li>
  </ul>

  <h3>Instalação</h3>
  <ol>
    <li>Clone o repositório
      <pre><code>git clone https://github.com/seu-usuario/laravel-nextjs.git
cd laravel-nextjs</code></pre>
    </li>
    <li>Instale as dependências
      <pre><code># Backend
composer install

# Frontend
cd frontend
npm install</code></pre>
    </li>
    <li>Configure o ambiente
      <pre><code>cp .env.example .env
php artisan key:generate</code></pre>
    </li>
    <li>Execute as migrações e seeders
      <pre><code>php artisan migrate --seed</code></pre>
    </li>
    <li>Inicie os servidores
      <pre><code># Backend (em um terminal)
php artisan serve

# Frontend (em outro terminal)
cd frontend
npm run dev</code></pre>
    </li>
  </ol>

  <h2>🧪 Executando os testes</h2>
  <pre><code>php artisan test</code></pre>

  <h2>📚 Documentação da API</h2>
  <table>
    <tr>
      <th>Método</th>
      <th>Endpoint</th>
      <th>Descrição</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/register</td>
      <td>Registrar usuário</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/login</td>
      <td>Login</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/clients</td>
      <td>Listar clientes</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/clients</td>
      <td>Criar cliente</td>
    </tr>
  </table>

  <h2>🤝 Contribuindo</h2>
  <ol>
    <li>Faça um fork do projeto</li>
    <li>Crie uma branch para sua feature (<code>git checkout -b feature/nova-feature</code>)</li>
    <li>Commit suas alterações (<code>git commit -m 'Adiciona nova feature'</code>)</li>
    <li>Push para a branch (<code>git push origin feature/nova-feature</code>)</li>
    <li>Abra um Pull Request</li>
  </ol>
</div>
