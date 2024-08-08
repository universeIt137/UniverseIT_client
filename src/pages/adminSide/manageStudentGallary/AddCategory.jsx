import { FaPlus } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
const AddCategory = ({ allCategory, allCategoryRefetch }) => {
    const axiosPublic = useAxiosPublic();

    console.log(allCategory);
    const categories = ['Marchandising', 'Computer Operation', 'Pattern Design', 'Fashion Design', 'Interior Design'];

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = event.target;
        const data = { category_name: form.category_name.value }
        axiosPublic.post('/addCategory', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                    allCategoryRefetch()
                    document.getElementById('addCategoryModal').close();
                }

            })
            .catch(err => {
                console.log(err);
            })
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
                axiosPublic.delete(`/deleteCategory/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            allCategoryRefetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });
    }
    return (
        <div className="w-full">
            <h2 className="p-4 text-gray-600 text-2xl font-bold">All Categories </h2>
            <div className="flex gap-3 flex-col items-center h-full">
                {
                    allCategory?.map((category, idx) => <div key={idx} className="flex gap-2 justify-center items-center">
                        <p className="flex bg-gray-500 text-white w-[160px] justify-center items-center py-1 rounded-md" >{category?.category_name}</p>
                        <button onClick={() => handleDelete(category?._id)} className=' h-8 w-8 flex justify-center items-center bg-red-500 rounded-md hover:bg-red-600 cursor-pointer transition-all duration-300 text-white'>X</button>
                    </div>)
                }
                <button onClick={() => document.getElementById('addCategoryModal').showModal()} className="flex bg-blue-600 text-white w-[202px] justify-center items-center py-1 rounded-md gap-2" ><FaPlus /> Add Category</button>
                <dialog id="addCategoryModal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Category</h3>

                        {/* add category input Field */}
                        <form onSubmit={handleSubmit} className="p-2 w-full space-y-5">
                            <div className="relative">
                                <label className="leading-7 text-sm text-gray-600 font-bold">Category Name</label>
                                <input required type="text" name="category_name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AddCategory;