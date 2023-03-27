import { z } from "zod";
import { ContainerCategory, ContainerStatus, ContainerType } from "../roles/containerRoles";

const pattern = /^[a-zA-Z]{4}\d{7}$/;

const payloadSchemaCreateContainer = z.object({
  client: z.string().min(1, "Nome Obrigatorio"),
  numberContainer: z.string().regex(pattern, "Codigo do conteiner deve seguir o padrão de quatro letras seguido de sete dígitos numéricos!"),
  type: z.nativeEnum(ContainerType),
  status: z.nativeEnum(ContainerStatus),
  category: z.nativeEnum(ContainerCategory),
})

const createContainerSchema = (param: unknown) => payloadSchemaCreateContainer.safeParse(param);
export const validationCreateContainer = createContainerSchema;

const payloadSchemaFilter = z.object({
  client: z.string().min(1, "Parametro invalido").optional(),
  numberContainer: z.string().min(1, "Parametro invalido").optional(),
  type: z.string().min(1, "Parametro invalido").optional(),
  status: z.string().min(1, "Parametro invalido").optional(),
  category: z.string().min(1, "Parametro invalido").optional()
})

const filterSchema = (param: unknown) => payloadSchemaFilter.safeParse(param);
export const validationFilter = filterSchema;