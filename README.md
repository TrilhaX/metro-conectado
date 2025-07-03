# 🚇 Metrô+Conectado – Sistema de Informações Inteligentes para Usuários do Metrô

## 👥 Integrantes
- João Vitor Trilha Richartz  
- Luiz Fernando Ribeiro Santos  
- Gustavo Silva de Sordi  

---

## 📌 Problema / Oportunidade

Usuários do metrô frequentemente enfrentam incertezas quanto ao **tempo de espera**, **lotação dos vagões** e **mudanças no funcionamento do sistema** (como obras ou atrasos). Embora existam alguns aplicativos, muitos **não oferecem dados em tempo real** ou são limitados na apresentação das informações.

Dados da ANTP mostram que milhões de pessoas utilizam o metrô diariamente nas grandes capitais, o que reforça a **relevância social e urbana** da proposta.

---

## 🎯 Objetivo do Projeto

### Objetivo Geral
Desenvolver um **sistema inteligente de informações em tempo real** para linhas de metrô, visando melhorar a experiência dos usuários e a eficiência da mobilidade urbana.

### Objetivos Específicos
- Informar sobre a **lotação dos vagões**, usando sensores ou dados colaborativos.
- Exibir o **tempo estimado de chegada** dos trens.
- Alertar usuários sobre **falhas, obras ou mudanças operacionais**.
- Sugerir **rotas alternativas** em casos de interrupção.

---

## 🧩 Justificativa

A escolha do **React** (React para Web e React Native para Mobile) oferece **desenvolvimento unificado**, reutilização de componentes, ótima documentação e compatibilidade com sistemas móveis e web, permitindo integração com sensores e APIs em tempo real de forma eficiente.

---

## 👥 Público-Alvo

- Usuários do metrô em grandes centros urbanos  
- Empresas que operam redes metroviárias  
- Órgãos públicos de transporte urbano

---

## 💡 Descrição da Solução Proposta

Sistema composto por **aplicativo mobile (React Native)** e **painéis informativos (web com React)**, com funcionalidades como:

- Visualização da **lotação dos trens** em tempo real (via sensores, câmeras ou colaboração do usuário)
- **Previsão de chegada** dos trens por estação
- **Alertas personalizados** por notificações push
- **Mapas integrados** com rotas e conexões (Google Maps, MapBox)

---

## 📱 Produto Final

- Aplicativo mobile (React Native)
- Painéis informativos web (React)
- Integração opcional com sensores físicos (IoT)

---

## 🛠 Tecnologias Utilizadas

| Categoria | Tecnologias |
|----------|--------------|
| **Linguagens** | JavaScript (React, React Native) e C++ (IoT - opcional) |
| **Frameworks** | React (Web), React Native (Mobile), Node.js ou Flask (backend) |
| **Banco de Dados** | Firebase (tempo real), PostgreSQL (dados estruturados) |
| **APIs** | Google Maps API, APIs públicas de metrô, APIs próprias |
| **Outros** | MQTT (comunicação IoT), Figma (UX/UI), Draw.io (diagramas) |

---

## 🧠 Conteúdos Relacionados

- **Programação**: Interfaces React/React Native, API, integração com sensores
- **Banco de Dados**: Estruturação e consultas de dados operacionais
- **Análise de Sistemas**: Requisitos, casos de uso, fluxogramas
- **UX/UI**: Design centrado no usuário com foco em acessibilidade
- **Gestão de Projetos**: Cronograma, tarefas e entregas
- **IoT (opcional)**: Sensores de presença e câmeras

---

## 🧪 Protótipo Inicial

### Wireframes
- Tela de escolha de estação e linha
- Visualização em tempo real dos trens
- Alertas (falhas, atrasos, manutenções)
- Sugestões de rotas alternativas

### Fluxograma Funcional
```plaintext
[Coleta de dados (sensores/API)] → [Banco de Dados] → [API] → [React/React Native Interfaces]