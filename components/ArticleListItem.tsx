"use client"

import Link from "next/link"
import type { ArticleItem } from "@/types"

interface Props {
  category: string
  articles: ArticleItem[]
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-cormorantGaramond text-4xl" style={{ color: 'var(--hover-color)' }}>{category}</h2>
      <div className="flex flex-col gap-2.5 font-poppins text-lg">
        {articles.map((article, id) => (
          <Link
            href={`/${article.id}`}
            key={id}
            className="transition duration-150 hover-link"
            style={{
              color: 'var(--text-color)',
            }}
          >
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticleItemList
