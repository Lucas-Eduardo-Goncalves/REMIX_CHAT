import type { z } from "zod";
import { schema } from "./_schemas";

type UserProps = z.infer<(typeof schema)["user"]>;
type MessageProps = z.infer<(typeof schema)["message"]>;
type LoaderProps = z.infer<(typeof schema)["fetch"]>;

export type { UserProps, MessageProps, LoaderProps };
