import Modal from "@/components/layouts/Modal";
import BookIcon from "@/assets/book-icon.svg";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSchema, TBook } from "../validation";
import { Button } from "@/components/ui/button";
import { addBookService } from "@/services/book";
import { useToast } from "@/hooks/use-toast";

export default function ModalAddBook({
  isOpen,
  onClose,
  fetchReload,
}: {
  isOpen: boolean;
  onClose: () => void;
  fetchReload: () => Promise<void>;
}) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<TBook>({
    resolver: zodResolver(BookSchema),
  });

  const watchFile = watch("file");
  const fileName = watchFile instanceof File ? watchFile.name : undefined;

  const onSubmit: SubmitHandler<TBook> = async (data) => {
    console.log(data);
    const res = await addBookService(data);
    if (res.statusCode == 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      onClose();
      reset();
      fetchReload();
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
          <h1 className="font-semibold text-xl">Add Book</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 my-5">
            <Input
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
                  <div className="text-gray-900 text-xs">
                    {fileName ? fileName : <>Upload Cover</>}
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="file"
                  {...register("file", {
                    onChange: (e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        setValue("file", file);
                      }
                    },
                  })}
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
              register={register}
              name="author_name"
              placeholder="Author name"
              errors={errors.author_name}
            />
            <Input
              register={register}
              name="publisher_name"
              placeholder="Publisher name"
              errors={errors.publisher_name}
            />
            <Input
              register={register}
              name="year_published"
              type="number"
              placeholder="Year published"
              errors={errors.year_published}
            />
            <Input
              register={register}
              name="quantity"
              type="number"
              placeholder="quantity"
              errors={errors.quantity}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
