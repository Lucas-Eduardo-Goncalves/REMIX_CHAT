import type { z } from "zod";
import { schema } from "./_schemas";

type UserProps = z.infer<(typeof schema)["user"]>;
type ChatProps = z.infer<(typeof schema)["chat"]>;
type LoaderProps = z.infer<(typeof schema)["fetchSchema"]>;

export type { UserProps, ChatProps, LoaderProps };
