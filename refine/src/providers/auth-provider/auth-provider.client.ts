"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

type MockUser = {
  name: string;
  email: string;
  password: string;
  roles: string[];
  avatar: string;
};

const mockUsers: MockUser[] = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    password: "admin123",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    password: "editor123",
    roles: ["editor"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password }) => {
    const userEmail = email ?? username;

    if (!userEmail || !password) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Email and password are required",
        },
      };
    }

    const user = mockUsers.find(
      (item) => item.email === userEmail && item.password === password,
    );

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/map",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  register: async (params) => {
    const { email, password, providerName } = params ?? {};

    if (providerName) {
      return {
        success: false,
        error: {
          name: "ProviderNotConfigured",
          message: `${providerName} sign up is not configured`,
        },
      };
    }

    if (!email || !password) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Email and password are required",
        },
      };
    }

    const alreadyExists = mockUsers.some((item) => item.email === email);

    if (alreadyExists) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "User already exists",
        },
      };
    }

    const newUser: MockUser = {
      name: email.split("@")[0] || "New User",
      email,
      password,
      roles: ["editor"],
      avatar: "https://i.pravatar.cc/150?img=3",
    };

    mockUsers.push(newUser);

    Cookies.set("auth", JSON.stringify(newUser), {
      expires: 30,
      path: "/",
    });

    return {
      success: true,
      redirectTo: "/map",
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
