import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authApi } from "@/mocks/auth";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
   
      const result = await authApi.authRegister(values);
       
      if (result) {
        toast.success("Register Successfully!");
        navigate("/login");
      } else {
        toast.error("User not registed!");
      }
    },
  });
  return (
    <div className="w-full min-h-[100vh] full border flex justify-center items-center">
      <div className="w-1/3 p-4 shadow-xl rounded-lg">
        <h4 className="font-bold text-xl text-foreground">Sign Up</h4>
        <p className="text-nowrap text-gray-600 font-medium">
          to continue to sign up for Chat
        </p>
        <Button
          variant="outline"
          className="w-full text-nowrap text-center gap-4 my-3 text-base flex justify-start"
        >
          <GoogleIcon /> Continue With Google
        </Button>

        <div className="!w-full  space-x-3 my-4 flex justify-between items-center">
          <div className="w-full">
            <Separator />
          </div>
          <div>Or</div>
          <div className="w-full">
            <Separator />
          </div>
        </div>

        <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-1.5 text-lg">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 text-lg">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 text-lg">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-full">
            CONTINUE
          </Button>
        </form>

        <Separator className="my-4" />

        <p className="text-sm font-bold text-muted-foreground">
          Already have an account ?{" "}
          <Link to={"/login"}>
            <Button variant="link">Log In</Button>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
