import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { authApi } from "@/mocks/auth";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
     
        const result = await authApi.authLogin(values);
         
        if (result) {
          toast.success("Login Successfully!");
          navigate("/dashboard");
        } else {
          toast.error("User not registed!");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  });
  return (
    <div className="w-full min-h-[100vh] full border flex justify-center items-center">
      <div className="w-1/3 p-4 shadow-xl rounded-lg">
        <h4 className="font-bold text-xl text-foreground">Sign In</h4>
        <p className="text-nowrap text-gray-600 font-medium">
          to continue to Sign In for Chat!
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
          No Account ?{" "}
          <Link to={"/register"}>
            <Button variant="link">Sign Up</Button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
