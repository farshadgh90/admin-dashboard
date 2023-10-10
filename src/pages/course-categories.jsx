import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterceptedService } from "@core/http-service";
import { Suspense, useState } from "react";
import CategoryList from "../features/categories/components/category-list";
import Modal from "../components/modal";

const CourseCategories = () => {
  const data = useLoaderData();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState()
  const navigate = useNavigate()

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId)
    setShowDeleteModal(true)
  }

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false)
    const response = await httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`)
    if(response.status === 200) {
      const url = new URL(window.location.href)
      navigate(url.pathname + url.search)
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <a className="btn btn-primary fw-bolder mt-n1">افزودن دسته جدید</a>
          </div>
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
          >
            <Await resolve={data?.categories}>
              {(loadedCategories) => (
                <CategoryList deleteCategory={deleteCategory} categories={loadedCategories} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal isOpen={showDeleteModal} open={setShowDeleteModal} title="حذف" body="آیا از حذف این دسته اطمینان دارید؟">
        <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>انصراف</button>
        <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteCategory}>حذف</button>
      </Modal>
    </>
  );
};

export async function categoriesLoader({ request }) {
  return defer({
    categories: loadCategories(request),
  });
}

const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";
  url += `?Page=${page}&PageSize=${pageSize}`;
  const response = await httpInterceptedService.get(url);
  return response.data;
};

export default CourseCategories;
