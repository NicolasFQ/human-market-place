# HUMAN.EXE IA

![HUMAN.EXE Logo](assets/logo.png)

## 🎯 Sobre o Projeto

O **HUMAN.EXE IA** é uma aplicação web inovadora que utiliza inteligência artificial para criar visuais únicos de personagens. A plataforma permite aos usuários selecionar um personagem e descrever sua visão criativa, gerando imagens personalizadas através de IA.

## ✨ Funcionalidades

- **Seleção de Personagens**: Escolha entre 5 personagens únicos (Ana Clara, Winny, Yasmin, Vitor, Nicolas)
- **Interface Intuitiva**: Design moderno e responsivo com animações suaves
- **Chat com IA**: Sistema de conversação para descrever sua visão criativa
- **Geração de Imagens**: Criação automática de visuais baseados em descrições textuais
- **Sistema de Usos**: Controle de tentativas restantes
- **Modal de Confirmação**: Interface para finalizar e confirmar criações
- **Visualização Ampliada**: Zoom em imagens geradas

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animações**: GSAP (GreenSock Animation Platform)
- **IA Integration**: N8N Webhook para processamento de IA
- **Design**: Interface moderna com gradientes e efeitos visuais
- **Responsividade**: Layout adaptável para diferentes dispositivos

## 📁 Estrutura do Projeto

```
HUMAN.EXE/
├── assets/                 # Imagens e recursos visuais
│   ├── logo.png           # Logo da aplicação
│   ├── robo.png           # Ícone do visual creator
│   ├── ana.png            # Personagem Ana Clara
│   ├── winny.png          # Personagem Winny
│   ├── yas.png            # Personagem Yasmin
│   ├── vitor.png          # Personagem Vitor
│   ├── nicolas.png        # Personagem Nicolas
│   └── ...                # Outros assets
├── css/                   # Estilos CSS
│   ├── style.css          # Estilos principais
│   └── visual.css         # Estilos da página de criação
├── js/                    # Scripts JavaScript
│   ├── script.js          # Lógica da página inicial
│   └── visual.js          # Lógica do chat e geração de IA
├── index.html             # Página principal
├── visual.html            # Página de criação de visuais
└── README.md              # Documentação do projeto
```

## 🎮 Como Usar

1. **Acesse a aplicação** através do `index.html`
2. **Selecione um personagem** clicando em uma das opções disponíveis
3. **Clique em "Continuar"** para prosseguir para a criação
4. **Descreva sua visão** no chat com a IA
5. **Aguarde a geração** da imagem personalizada
6. **Confirme ou refaça** conforme sua preferência

## 🔧 Configuração

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para integração com IA)

## 🎨 Características do Design

- **Paleta de Cores**: Gradientes vibrantes e cores temáticas por personagem
- **Animações**: Transições suaves com GSAP
- **Tipografia**: Fonte moderna e legível
- **Layout**: Design responsivo e intuitivo
- **Interatividade**: Efeitos hover e feedback visual

## 👥 Equipe de Desenvolvimento

- **Ana Clara Morante**
- **Nicolas Freire Queiroz** 
- **Vitor Gabriel Laurindo Borin** 
- **Winny Lopes Duraes**
- **Yasmim Yshen Kang** 

## 🔗 Integração com IA

O projeto utiliza um webhook N8N para processamento de IA:
- **Endpoint**: Configurado para receber prompts e personagens
- **Formato**: JSON com campos `personagem` e `prompt`
- **Resposta**: Imagens geradas ou URLs de imagens
- **Fallback**: Sistema de retry automático em caso de falha

## 📱 Responsividade

A aplicação foi desenvolvida com foco em responsividade:
- **Desktop**: Layout otimizado para telas grandes
- **Tablet**: Adaptação para dispositivos médios
- **Mobile**: Interface amigável para smartphones

## 📄 Licença

Este projeto foi desenvolvido como parte de um trabalho acadêmico do 2º Semestre.

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**HUMAN.EXE IA** - Criando o futuro da personalização digital com IA 🚀
