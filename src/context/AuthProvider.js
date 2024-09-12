import { createContext, useState } from "react";
import { User } from "../index";

export const UserContext = createContext<User | undefined>(undefined);