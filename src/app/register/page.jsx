"use client";

import SocialLogin from "@/components/SocialLogin";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    await authClient.signUp.email(
      {
        name: data.name, // required
        email: data.email, // required
        password: data.password, // required
        image: data.image,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          console.log("Register Success");
          router.push("/");
        },
        onError: (error) => {
          console.log("Register Failed");
          console.log(error);
        },
      },
    );

    console.log(data);
  };

  return (
    <section className="max-w-6xl mx-auto mt-4">
      <form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* Name Field */}
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Your Name" />
          <FieldError />
        </TextField>
        {/* Email Field */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <TextField isRequired name="image" type="text">
          <Label>Image</Label>
          <Input placeholder="Your Image URL" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </section>
  );
}
