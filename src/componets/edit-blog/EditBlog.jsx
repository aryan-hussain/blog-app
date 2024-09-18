import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImagePlus, Tag, X, Loader2 } from 'lucide-react';
import { fetchSingleArticle, updateArticle } from '../../redux/slices/articleSlice';

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentArticle, status, error } = useSelector((state) => state.articles);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentArticle) {
      setValue('title', currentArticle.title);
      setValue('content', currentArticle.content);
      setTags(currentArticle.tags || []);
      setImagePreview(currentArticle.image);
    }
  }, [currentArticle, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('tags', JSON.stringify(tags));
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await dispatch(updateArticle({ id, formData })).unwrap();
      navigate(`/article/${id}`); // Redirect to the updated article
    } catch (error) {
      setSubmitError('An error occurred while updating the post. Please try again.');
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>{error || 'Failed to load the article.'}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="mt-1"
                placeholder="Enter your blog post title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <Textarea
                id="content"
                {...register('content', { required: 'Content is required' })}
                className="mt-1"
                rows={10}
                placeholder="Write your blog post content here..."
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
              <div className="flex mt-1">
                <Input
                  id="tags"
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-grow"
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={handleAddTag} className="ml-2">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Featured Image</label>
              <div className="mt-1 flex items-center">
                <Input
                  id="image"
                  type="file"
                  {...register('image')}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <ImagePlus className="h-4 w-4 inline-block mr-2" />
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </label>
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Update Post
            </Button>
          </form>

          {submitError && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlogPost;