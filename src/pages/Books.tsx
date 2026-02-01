import { Book, Star } from 'lucide-react'

const books = [
  { title: 'Refactoring', author: 'Martin Fowler', rating: 5, review: '每个开发者的必读书目。' },
  { title: 'Clean Code', author: 'Robert C. Martin', rating: 4, review: '关于代码整洁的经典之作。' },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', rating: 5, review: '深入理解分布式系统的神作。' },
]

export default function Books() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Book className="text-primary" /> 读书笔记
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.title} className="rounded-xl border p-6 hover:border-primary transition-colors">
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < book.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"} />
              ))}
            </div>
            <p className="text-sm italic">"{book.review}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}
