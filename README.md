Découverte du "vibe-coding"... Expérience pour voir le fonctionnement avec Github Copilot et comment le combiner avec mes compétences actuelles pour développer des PoCs/MvP rapidement.

Après quelques heures (~6h), 99% de l'appli a été faite seulement avec des prompts sur copilot (pro, ayant atteins la limite de 50 échanges avec copilot). La qualité est moyenne mais la vitesse de dévelopement est définitevement présente. Subsistes quelques inconvénients du genre il faut vraiment babysitter de A-Z pour s'assurer que les imports, unused-vars et ce genre de chose soient fixed (et parfois revenir dessus plusieurs fois).

Néanmoins la capacité de développer des pocs/mvp est clairement là. La possibilité de build des applis à 100% en ne se basant QUE sur copilot en revanche me paraît encore difficilement possible.

La partie build/deploy a été faite à la main.
Les models JSON ont été build avec ChatGPT et très légèrement adaptés à la main pour avoir quelque chose d'un peu plus constant overall

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
