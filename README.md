# Operação Nuvem Literária -  LendoMais (BiblioTech)

> Arquitetura Cloud-Native Full Stack containerizada com **Docker**, automação de build e entrega contínua via **GitHub Actions**, registro de imagens no **Docker Hub** e hospedagem gerenciada em nuvem no **Render** com banco de dados **PostgreSQL**.

---

## Links Oficiais do Projeto e Entregáveis

| Componente | Plataforma | Endereço Público |
| :--- | :--- | :--- |
| **Código-Fonte & CI/CD** | GitHub | https://github.com/Esparta009boy/operacao-nuvem-literaria-lendomais |
| **Imagem Docker (Frontend React)** | Docker Hub | https://hub.docker.com/r/rondoc007/lendomais-frontend |
| **Imagem Docker (Backend Node.js)** | Docker Hub | https://hub.docker.com/r/rondoc007/lendomais-backend |
| **Aplicação Web (Frontend)** | Render | https://lendomais-frontend.onrender.com |
| **API REST (Backend)** | Render | https://lendomais-api.onrender.com |

---

## 1. Objetivo

Eliminar a dependência de ambientes locais (*"na minha máquina funciona"*), padronizando o empacotamento, a distribuição e a execução em nuvem da plataforma **LendoMais (BiblioTech)** por meio de contêineres Docker imutáveis, automação de pipeline CI/CD e integração segura entre **Frontend (React + Vite)**, **Backend (Node.js + Express)** e **Banco de Dados Relacional (PostgreSQL)** em ambiente de produção.

---

## 2. Introdução

Em cenários modernos de Engenharia de Software e DevOps, disponibilizar uma aplicação full stack com previsibilidade exige desacoplar o código-fonte das particularidades do sistema operacional onde foi desenvolvido. A **Operação Nuvem Literária** resolve o desafio de migrar uma aplicação web de catálogo e gestão de acervo literário do `localhost` para a nuvem.

Para alcançar portabilidade total sem depender de infraestrutura local pesada, toda a esteira de construção (*build*) e publicação (*push*) das imagens foi automatizada na nuvem via **GitHub Actions**, alimentando repositórios públicos no **Docker Hub** que servem diretamente os serviços gerenciados no **Render**.

---

## 3. Arquitetura e Funcionamento em Ambientes Corporativos

Em ambientes corporativos de produção, a arquitetura adotada segue o modelo de **microsserviços desacoplados e entrega baseada em artefatos imutáveis (Container Registry)**:

```text
[ Desenvolvedor / Git Push ]
            │
            ▼
[ GitHub Repository (main) ] ──► [ GitHub Actions (Docker Buildx) ]
                                            │
                       ┌────────────────────┴────────────────────┐
                       ▼                                         ▼
     [ Docker Hub: lendomais-backend ]         [ Docker Hub: lendomais-frontend ]
                       │                                         │
                       ▼                                         ▼
       [ Render Web Service: API ]               [ Render Web Service: Web ]
       (Node.js + Express :3001)                  (Nginx + React Build :80)
                       │
                       ▼
        [ Render Managed PostgreSQL ]
         (Comunicação Interna + SSL)
