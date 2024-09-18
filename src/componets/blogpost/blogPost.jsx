// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSingleArticle } from './articlesSlice';
// import { Card, CardContent } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react';

// const SingleBlogPost = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { currentArticle, status, error } = useSelector((state) => state.articles);

//   useEffect(() => {
//     dispatch(fetchSingleArticle(id));
//   }, [dispatch, id]);

//   if (status === 'loading') {
//     return <div className="flex justify-center items-center h-screen">Loading article...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
//   }

//   if (!currentArticle) {
//     return <div className="flex justify-center items-center h-screen">Article not found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="mb-8">
//         <CardContent className="p-6">
//           <h1 className="text-4xl font-bold mb-4">{currentArticle.title}</h1>
//           <div className="flex items-center space-x-4 mb-6">
//             <Avatar>
//               <AvatarImage src={currentArticle.author.avatar} alt={currentArticle.author.name} />
//               <AvatarFallback>{currentArticle.author.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-semibold">{currentArticle.author.name}</p>
//               <div className="flex items-center text-sm text-gray-500">
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 <span>{new Date(currentArticle.publishDate).toLocaleDateString()}</span>
//                 <ClockIcon className="ml-4 mr-2 h-4 w-4" />
//                 <span>{currentArticle.readTime} min read</span>
//               </div>
//             </div>
//           </div>
//           {currentArticle.image && (
//             <img 
//               src={currentArticle.image} 
//               alt={currentArticle.title} 
//               className="w-full h-64 object-cover rounded-lg mb-6"
//             />
//           )}
//           <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
//           <div className="mt-8 pt-4 border-t">
//             <div className="flex items-center">
//               <TagIcon className="mr-2 h-5 w-5 text-gray-500" />
//               <div className="flex flex-wrap gap-2">
//                 {currentArticle.tags.map((tag) => (
//                   <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SingleBlogPost;