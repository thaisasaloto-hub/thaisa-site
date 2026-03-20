export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-sao-precatorios",
    title: "O que são Precatórios e como funcionam?",
    excerpt: "Entenda o que são precatórios, como surgem e quais os direitos dos credores. Um guia completo para quem tem valores a receber do governo.",
    content: `
Os precatórios são ordens de pagamento expedidas pelo Poder Judiciário para que a Fazenda Pública (União, Estados, Municípios ou suas autarquias) pague uma dívida reconhecida judicialmente.

## Como surgem os precatórios?

Quando uma pessoa física ou jurídica ganha uma ação judicial contra o governo, e essa decisão transita em julgado (ou seja, não cabe mais recurso), o valor devido é inscrito como precatório para pagamento.

## Tipos de precatórios

Existem dois tipos principais:

**1. Precatórios de natureza alimentar**
São aqueles decorrentes de salários, vencimentos, proventos, pensões, aposentadorias, benefícios previdenciários e indenizações por morte ou invalidez.

**2. Precatórios de natureza comum**
Referem-se a dívidas não alimentares, como desapropriações, contratos administrativos e outras obrigações.

## Ordem de pagamento

Os precatórios alimentares têm preferência sobre os comuns. Dentro de cada categoria, há ainda preferência para idosos (60 anos ou mais), pessoas com deficiência e portadores de doenças graves.

## Prazo para recebimento

Segundo a Constituição Federal, os precatórios devem ser pagos até o final do exercício seguinte ao de sua apresentação. No entanto, na prática, os prazos variam conforme o ente devedor e a disponibilidade orçamentária.

## Conclusão

Conhecer seus direitos é fundamental para garantir o recebimento do seu precatório. Conte com assessoria jurídica especializada para acompanhar todo o processo.
    `.trim(),
    author: "Dra. Thaisa",
    date: "2025-11-30",
    readTime: "5 min",
    category: "Precatórios"
  },
  {
    slug: "habilitacao-de-herdeiros-precatorios",
    title: "Habilitação de Herdeiros em Precatórios: O que você precisa saber",
    excerpt: "Saiba como funciona o processo de habilitação de herdeiros para receber precatórios deixados por familiares falecidos.",
    content: `
Quando o titular de um precatório falece antes de receber o valor, os herdeiros têm direito a esse crédito. No entanto, é necessário passar por um processo de habilitação para que possam receber.

## O que é a habilitação de herdeiros?

A habilitação é um procedimento judicial ou administrativo pelo qual os herdeiros comprovam seu direito de receber o precatório deixado pelo falecido.

## Documentos necessários

Para dar início ao processo, geralmente são exigidos:

- Certidão de óbito do titular
- Certidão de nascimento ou casamento dos herdeiros
- Documentos de identidade e CPF
- Comprovante de residência
- Formal de partilha ou alvará judicial (se houver inventário concluído)

## Inventário é obrigatório?

Na maioria dos casos, sim. O inventário é necessário para definir oficialmente quem são os herdeiros e qual a participação de cada um no crédito.

## Inventário extrajudicial x judicial

Se todos os herdeiros forem maiores, capazes e estiverem de acordo, o inventário pode ser feito em cartório (extrajudicial), de forma mais rápida e econômica.

Havendo menores, incapazes ou divergências entre herdeiros, o inventário deverá ser judicial.

## Prazo para habilitação

Não há prazo limite para habilitar-se, mas quanto antes o processo for iniciado, mais cedo os valores poderão ser liberados.

## Assessoria especializada

O processo de habilitação envolve particularidades que exigem conhecimento técnico. Uma assessoria jurídica especializada garante que todos os documentos sejam apresentados corretamente, evitando atrasos.
    `.trim(),
    author: "Dra. Thaisa",
    date: "2026-01-15",
    readTime: "6 min",
    category: "Herdeiros"
  },
  {
    slug: "venda-de-precatorios-cuidados",
    title: "Venda de Precatórios: Cuidados essenciais antes de negociar",
    excerpt: "Pensando em vender seu precatório? Conheça os cuidados necessários para fazer uma negociação segura e vantajosa.",
    content: `
A venda de precatórios é uma opção para quem deseja antecipar o recebimento do crédito. No entanto, é fundamental tomar alguns cuidados para não sair prejudicado.

## Por que vender um precatório?

A fila de pagamento de precatórios pode ser longa, especialmente em alguns estados e municípios. Por isso, muitos credores optam por vender seus créditos para receber o valor de forma antecipada.

## Deságio: o que é?

O deságio é o desconto aplicado sobre o valor do precatório na hora da venda. Ele varia conforme o ente devedor, a posição na fila e as condições de mercado.

## Cuidados essenciais

**1. Verifique a idoneidade do comprador**
Pesquise a empresa ou investidor interessado. Consulte o CNPJ, verifique há quanto tempo atua no mercado e busque referências.

**2. Entenda o contrato**
Leia atentamente todas as cláusulas. Em caso de dúvida, consulte um advogado antes de assinar.

**3. Confirme os valores**
Certifique-se de que o valor negociado corresponde ao valor real do seu precatório, descontado o deságio acordado.

**4. Formalize corretamente**
A cessão do precatório deve ser formalizada judicialmente para ter validade.

## Quando não vender?

Se o seu precatório está próximo de ser pago, pode valer a pena esperar. Avalie sua situação financeira e as condições oferecidas antes de decidir.

## Conclusão

Vender um precatório pode ser uma boa solução, mas exige cautela. Conte com orientação jurídica para garantir uma negociação segura.
    `.trim(),
    author: "Dra. Thaisa",
    date: "2026-02-01",
    readTime: "5 min",
    category: "Beneficiários"
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
