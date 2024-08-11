import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { makeVisibleTime } from '../../../makeVisibleTime';
import OtherBlogs from './OtherBlogs';
import Comments from './Comments';
 
const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: blogData = {}, refetch: blogDataRefetch, isLoading } = useQuery({
        queryKey: ['blogData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleBlog/${id}`)
            return res?.data
        }
    })
    if (isLoading) {
        return ''
    }
    console.log(blogData);
    const { author, blogImageUrl, date, description, meta_word, title, _id } = blogData;
    console.log(author);
    return (
        <div className='lg:px-20'>
            <p className="text-4xl m-10"><span className='text-primary '>Blog</span> Details</p>
            <div className='lg:flex gap-5 sm:m-4 pb-20'>
                <div className='lg:w-3/4 mx-auto bg-gray-200'>
                    <img
                        className='w-full'
                        src={blogImageUrl}
                        alt="Shoes"

                    />
                    <div className='flex items-center gap-10 pt-10'>
                        <p className='pt-2 text-white px-10 bg-primary'>{makeVisibleTime(date)}</p>
                        <p className='text-2xl font-bold'>{title}</p>
                    </div>

                    <div className='py-10'>
                        <p dangerouslySetInnerHTML={{ __html: description }} className='px-2'>
                        </p>
                    </div>
                    <Comments blogId={id} />
                </div>
                <div className='lg:w-1/4 pt-10 px-2 text-2xl'> Another Blogs

                    <OtherBlogs detailsBlogId={_id} />



                </div>


            </div>


        </div>
    );
};

export default BlogDetails;