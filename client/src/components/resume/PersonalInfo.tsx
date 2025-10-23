import type { PersonalInfo } from "@/assets/assts";
import {
  personalInfoSchema,
  type PersonalInfoSchema,
} from "@/validation/personal.info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Upload,
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Type,
} from "lucide-react";
import { useForm } from "react-hook-form";

interface PersonalInfoProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  removeBackground: boolean;
  setRemoveBackground: (value: boolean) => void;
}

const fields = [
  {
    key: "fullname",
    label: "Ad Soyad",
    placeholder: "Ahmet Yılmaz",
    icon: User,
    required: true,
    type: "text",
  },
  {
    key: "profession",
    label: "Meslek",
    placeholder: "Yazılım Geliştirici",
    icon: Briefcase,
    required: true,
    type: "text",
  },
  {
    key: "email",
    label: "E-posta",
    placeholder: "ahmet@example.com",
    icon: Mail,
    required: true,
    type: "email",
  },
  {
    key: "phone",
    label: "Telefon",
    placeholder: "+90 555 123 45 67",
    icon: Phone,
    required: true,
    type: "tel",
  },
  {
    key: "location",
    label: "Konum",
    placeholder: "İstanbul, Türkiye",
    icon: MapPin,
    required: false,
    type: "text",
  },
  {
    key: "title",
    label: "Başlık",
    placeholder: "Senior Frontend Developer",
    icon: Type,
    required: false,
    type: "text",
  },
] as const;

interface PersonalInfoProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  removeBackground: boolean;
  setRemoveBackground: (value: boolean) => void;
}

const PersonalInfoPage = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}: PersonalInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const formValues = watch();

  // Image Handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined);
  };

  const getImageUrl = () => {
    if (!formValues.image) return null;
    return typeof formValues.image === "string"
      ? formValues.image
      : URL.createObjectURL(formValues.image);
  };
  const handleChange = (field: keyof PersonalInfo, value: string | File) => {
    onChange({ ...data, [field]: value });
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(() => {})}>
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">Kişisel Bilgiler</h3>
        <p className="text-sm text-gray-500">
          CV'niz için kişisel bilgilerinizi girin
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Profil Fotoğrafı
        </label>

        <div className="flex items-start gap-4">
          {/* Image Preview */}
          <div className="relative group">
            <label
              htmlFor="profile-image"
              className="block cursor-pointer transition-all"
            >
              {formValues.image ? (
                <div className="relative">
                  <img
                    src={getImageUrl() || ""}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl object-cover border-2 border-gray-200 group-hover:border-blue-400 transition-all"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-2xl transition-all flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 flex flex-col items-center justify-center gap-2 transition-all group-hover:scale-105">
                  <User className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">
                    Yükle
                  </span>
                </div>
              )}

              <input
                id="profile-image"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Image Controls */}
          <div className="flex-1 space-y-3">
            <div className="text-sm text-gray-600">
              <p className="font-medium">JPG, JPEG veya PNG</p>
              <p className="text-xs text-gray-500 mt-1">
                Maksimum dosya boyutu: 5MB
              </p>
            </div>

            {formValues.image && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors w-fit"
                >
                  <X className="w-4 h-4" />
                  Fotoğrafı Kaldır
                </button>

                {typeof formValues.image === "object" && (
                  <label className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg cursor-pointer transition-colors w-fit">
                    <input
                      type="checkbox"
                      checked={removeBackground}
                      onChange={(e) => setRemoveBackground(e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(
          ({ key, label, placeholder, icon: Icon, required, type }) => (
            <div
              key={key}
              className={`${
                key === "fullname" || key === "profession" || key === "title"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="relative">
                <Icon className="absolute left-3 top-[1rem] w-4 h-4 text-gray-400" />
                <input
                  type={type}
                  value={data[key] as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  {...register}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              {errors[key]?.message && (
                <p className="text-xs text-red-500 mt-1">
                  {String(errors[key]?.message)}
                </p>
              )}
            </div>
          )
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 İpucu:</span> Tüm alanları
          doldurmanız CV'nizin daha profesyonel görünmesini sağlar.
        </p>
      </div>
    </form>
  );
};

export default PersonalInfoPage;
