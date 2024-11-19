import Modal from "@/components/layouts/Modal";
import BookIcon from "@/assets/book-icon.svg";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBookSchema, TUpdateBook } from "../validation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { urlToFile, FileOrString, isFile } from "@/utils/urlFile";
import { updateBookService } from "@/services/book";
import { useToast } from "@/hooks/use-toast";

export default function ModalEdiTUpdateBook({
  isOpen,
  onClose,
  fetchReload,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  fetchReload: () => Promise<void>;
  initialData?: IBook;
}) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TUpdateBook>({
    resolver: zodResolver(updateBookSchema),
    values: {
      author_name: initialData?.author_name!,
      publisher_name: initialData?.publisher_name!,
      title: initialData?.title!,
      year_published: initialData?.year_published!,
      quantity: initialData?.quantity!,
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<TUpdateBook> = async (data) => {
    const res = await updateBookService(initialData?.id!, data);
    if (res.statusCode == 200) {
      toast({
        title: "Success",
        description: res.message,
      });
      fetchReload();
      onClose();
    } else {
      toast({
        title: "Failed",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full">
        <div className="flex gap-3 items-center border-b pb-3 border-b-gray-800">
          <div className="bg-gray-200 rounded-lg p-3 w-fit">
            <BookIcon />
          </div>
          <h1 className="font-semibold text-xl">Edit Book</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 my-5">
            <Input
              label="Title"
              register={register}
              name="title"
              placeholder="Title"
              errors={errors.title}
            />
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full mt-2 flex h-[100px] cursor-pointer items-center justify-center rounded-xl border border-dashed"
              >
                <div className="flex flex-col items-center gap-5">
                  <div className="text-gray-900 text-xs">Upload Cover</div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="file"
                  {...register("file")}
                />
              </label>
              <div className="h-4">
                {errors.file && (
                  <span className="text-xs text-red-500">
                    {errors.file.message}
                  </span>
                )}
              </div>
            </div>
            <Input
              label="Author"
              register={register}
              name="author_name"
              placeholder="Author name"
              errors={errors.author_name}
            />
            <Input
              label="Publisher"
              register={register}
              name="publisher_name"
              placeholder="Publisher name"
              errors={errors.publisher_name}
            />
            <Input
              label="Year"
              register={register}
              name="year_published"
              type="number"
              placeholder="Year published"
              errors={errors.year_published}
            />
            <Input
              label="Quantity"
              register={register}
              name="quantity"
              type="number"
              placeholder="Quantity"
              errors={errors.quantity}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
