import ArticleItemList from "@/components/ArticleListItem"
import ThemeToggle from "@/components/ThemeToggle"
import { getCategorisedArticles } from "@/lib/articles"

const HomePage = () => {
  const articles = getCategorisedArticles()

  console.log(articles)
  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-8 flex flex-col gap-12 mb-20">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <header className="font-cormorantGaramond font-light text-6xl text-center -mt-4" style={{ color: 'var(--hover-color)' }}>
        <h1>Kaushik&apos;s Blog</h1>
      </header>
      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {articles !== null &&
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </section>
    </section>
  )
}

export default HomePage
