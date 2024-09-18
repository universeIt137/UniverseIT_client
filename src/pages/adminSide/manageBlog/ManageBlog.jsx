import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import BlogRow from "./BlogRow";
import Loading from "../../../Shared/Loading/Loading";

const ManageBlog = () => {


    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], refetch, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
    }
    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/blog/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });

    }
    console.log(blogs);




    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Blogs</title>
            </Helmet>
            <div className="pb-20">
                <div className="bg-white rounded-lg  w-full lg:w-[calc(100vw-300px)] overflow-x-auto mx-auto overflow-y-auto">
                    <p className="text-2xl font-bold text-center py-2">Manage Blogs</p>
                    <table className="table table-zebra overflow-x-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Blog</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Author Name</th>
                                <th>Meta keyword</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                blogs?.map((blog, index) => <BlogRow blog={blog} index={index} handleDelete={handleDelete} key={index} />
                                )
                            }



                        </tbody>


                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageBlog;