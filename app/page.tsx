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
      
      <section className="max-w-2xl mx-auto font-poppins">
          <h2 className="font-cormorantGaramond text-4xl mb-4 text-center" style={{ color: 'var(--hover-color)' }}>About Me</h2>
        {/* <p className="text-lg leading-relaxed mb-8 text-left" style={{ color: 'var(--text-color)' }}>
          Welcome to my part of the &apos;Internet&apos;.
        </p> */}
        <p className="text-lg leading-relaxed mb-8 text-left" style={{ color: 'var(--text-color)' }}>
          I&apos;m Kaushik. I enjoy exploring software engineering and AI at my own pace — reading the papers that genuinely 
          interest me, trying out ideas in small projects, and learning a little more each time. I like understanding how things 
          work under the hood, even if it means going slowly and figuring it out step by step.
        </p>
        
        <h2 className="font-cormorantGaramond text-4xl mb-4 text-center" style={{ color: 'var(--hover-color)' }}>About This Blog</h2>
        <p className="text-lg leading-relaxed mb-4 text-left" style={{ color: 'var(--text-color)' }}>
          This blog is where I collect the things that catch my attention in software engineering and AI. Sometimes it&apos;s 
          a research paper with an idea worth noting, sometimes it&apos;s a concept I&apos;m learning, and sometimes it&apos;s 
          just a resource that finally made something “click.”
        </p>
        <p className="text-base leading-relaxed opacity-90 text-left" style={{ color: 'var(--text-color)' }}>
          I&apos;m not trying to cover everything. I&apos;m just documenting what I explore — the useful bits, the interesting bits, 
          and the things I think are worth revisiting later. If you&apos;re someone who enjoys understanding how things work or likes 
          discovering new ideas in a simple, clear way, you&apos;ll probably find something here to follow.
        </p>
      </section>
      <section className="w-full max-w-4xl mx-auto">
        <div className="md:grid md:grid-cols-2 flex flex-col gap-10 md:gap-20">
          {articles !== null &&
            Object.keys(articles).map((article, index) => (
              <div 
                key={article}
                className={`${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}
              >
                <ArticleItemList
                  category={article}
                  articles={articles[article]}
                  isRightAligned={index % 2 === 1}
                />
              </div>
            ))}
        </div>
      </section>
    </section>
  )
}

export default HomePage
