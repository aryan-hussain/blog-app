import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchArticles } from '../../redux/slices/articleSlice';
import { dummyArticles, latestPostt } from '../../../public/data';

const categories = [
  'Tech', 'Lifestyle', 'AI', 'Entertainment', 'Sports',
  'World', 'India', 'Cricket', 'Business', 'Education'
];

const BlogList = () => {
  const dispatch = useDispatch();
  const { articles, latestPost, status } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // if (status === 'failed') {
  //   return <div className="flex justify-center items-center h-screen">Error loading articles</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8"></h1>

      
      {latestPostt && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Latest Post</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">{latestPostt.title}</h2>
            <p className="mt-2">{latestPostt.excerpt}</p>
            <a href={`/article/${latestPostt.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
              Read more
            </a>
          </CardContent>
        </Card>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dummyArticles
                  .filter((article) => article.category === category)
                  .slice(0, 3)
                  .map((article) => (
                    <li key={article.id}>
                      <a href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                        {article.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogList;