CREATE TABLE "alumno" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"telefono" text NOT NULL,
	"direccion" text NOT NULL,
	"gimnasio_id" integer,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bajo_peso_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_info_id" integer NOT NULL,
	"imc_saludable" double precision NOT NULL,
	"peso_pregestacional_saludable" double precision NOT NULL,
	"gramos_semana" double precision NOT NULL,
	"ganancia_1_trimestre" double precision NOT NULL,
	"ganancia_2y3_trimestre_gramos" double precision NOT NULL,
	"ganancia_2y3_trimestre_kg" double precision NOT NULL,
	"peso_total_embarazo" double precision NOT NULL,
	"peso_final" double precision NOT NULL,
	"ganancia_peso_embarazo" double precision NOT NULL,
	"ganancia_peso_clasificacion" text NOT NULL,
	"ganancia_primer_trimestre" double precision NOT NULL,
	"ganancia_2y3_trimestre_gsem" double precision NOT NULL,
	"peso_total_embarazo_titulo4" double precision NOT NULL,
	"imc_semana_40" double precision NOT NULL,
	"ganancia_tipo" text NOT NULL,
	"gano" double precision NOT NULL,
	"debio_ganar" double precision NOT NULL,
	"peso_a_ganar" double precision NOT NULL,
	"semanas_faltantes" integer NOT NULL,
	"gramos_por_semana" double precision NOT NULL,
	"clasificacion_gramos" text NOT NULL,
	"tasa_metabolica" double precision NOT NULL,
	"factor_actividad_fisica" double precision NOT NULL,
	"requerimiento_energia_total" double precision NOT NULL,
	"adicion_gestante" double precision NOT NULL,
	"total_energia_adicion" double precision NOT NULL,
	"metodo_1g_dia" double precision NOT NULL,
	"metodo_1_kcal" double precision NOT NULL,
	"metodo_1_amdr" double precision NOT NULL,
	"metodo_2g_dia" double precision NOT NULL,
	"metodo_2_kcal" double precision NOT NULL,
	"metodo_2_amdr" double precision NOT NULL,
	CONSTRAINT "bajo_peso_info_base_info_id_unique" UNIQUE("base_info_id")
);
--> statement-breakpoint
CREATE TABLE "base_user_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"gimnasio_id" integer NOT NULL,
	"identificacion" text NOT NULL,
	"nombre" text NOT NULL,
	"edad" integer NOT NULL,
	"estatura" double precision NOT NULL,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "entrenamiento" (
	"id" serial PRIMARY KEY NOT NULL,
	"alumno_id" integer,
	"semana" integer,
	"peso" double precision,
	"tipo_entrenamiento" text,
	"altura" double precision,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gemelar_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_info_id" integer NOT NULL,
	"gramos_semana" double precision NOT NULL,
	"ganancia_1_trimestre" double precision NOT NULL,
	"ganancia_2y3_trimestre_gramos" double precision NOT NULL,
	"ganancia_2y3_trimestre_kg" double precision NOT NULL,
	"peso_total_embarazo" double precision NOT NULL,
	"imc_semana_40" double precision NOT NULL,
	"gano" double precision NOT NULL,
	"debio_ganar" double precision NOT NULL,
	"peso_a_ganar" double precision NOT NULL,
	"semanas_faltantes" integer NOT NULL,
	"gramos_por_semana" double precision NOT NULL,
	"clasificacion_gramos" text NOT NULL,
	CONSTRAINT "gemelar_info_base_info_id_unique" UNIQUE("base_info_id")
);
--> statement-breakpoint
CREATE TABLE "gestante_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_user_info_id" integer NOT NULL,
	"seleccion_multiple" text NOT NULL,
	"semana_gestacion" integer NOT NULL,
	"peso_actual" double precision NOT NULL,
	"peso_pregestacional" double precision NOT NULL,
	"imc_pregestacional" double precision NOT NULL,
	"imc_gestacional" double precision NOT NULL,
	"imc_pregestacional_cat" text NOT NULL,
	CONSTRAINT "gestante_info_base_user_info_id_unique" UNIQUE("base_user_info_id")
);
--> statement-breakpoint
CREATE TABLE "gimnasio" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"direccion" text NOT NULL,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lactante_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_user_info_id" integer NOT NULL,
	"peso_actual" double precision NOT NULL,
	"peso_pregestacional" double precision NOT NULL,
	"imc_actual" double precision NOT NULL,
	"imc_cat" text NOT NULL,
	"dias_post_parto" integer NOT NULL,
	"retencion_post_parto" double precision NOT NULL,
	"retencion_post_parto_detalle" text NOT NULL,
	"tasa_metabolica" double precision NOT NULL,
	"factor_actividad_fisica" double precision NOT NULL,
	"descripcion_actividad_fisica" text NOT NULL,
	"requerimiento_energia" double precision NOT NULL,
	"energia_extra_requerida" double precision NOT NULL,
	"requerimiento_energia_total" double precision NOT NULL,
	CONSTRAINT "lactante_info_base_user_info_id_unique" UNIQUE("base_user_info_id")
);
--> statement-breakpoint
CREATE TABLE "nino_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_user_info_id" integer NOT NULL,
	"sexo" text NOT NULL,
	"peso" double precision NOT NULL,
	"talla" double precision NOT NULL,
	"perimetro_cefalico" double precision NOT NULL,
	CONSTRAINT "nino_info_base_user_info_id_unique" UNIQUE("base_user_info_id")
);
--> statement-breakpoint
CREATE TABLE "nino_sano_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_info_id" integer NOT NULL,
	"alimentacion" text NOT NULL,
	"pt" text,
	"te" text,
	"pce" text,
	"clasificacion_pt" text,
	"clasificacion_te" text,
	"clasificacion_pce" text,
	"ganancia_peso_gr" double precision,
	"calorias_1g_tejido" double precision,
	"veces_que_gane" integer,
	"calorias_crecimiento" double precision,
	"ajuste_deficit" double precision,
	"kcal_totales" double precision,
	"leche_materna_exclusiva" double precision,
	"formula_infantil" double precision,
	"leche_materna_y_formula" double precision,
	"rango_118_anos" double precision,
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "nino_sano_info_base_info_id_unique" UNIQUE("base_info_id")
);
--> statement-breakpoint
CREATE TABLE "rol" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"fecha_creacion" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sobre_peso_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"base_info_id" integer NOT NULL,
	"imc_saludable" double precision NOT NULL,
	"peso_pregestacional_saludable" double precision NOT NULL,
	"gramos_semana" double precision NOT NULL,
	"ganancia_1_trimestre" double precision NOT NULL,
	"ganancia_2y3_trimestre_gramos" double precision NOT NULL,
	"ganancia_2y3_trimestre_kg" double precision NOT NULL,
	"ganancia_total" double precision NOT NULL,
	"peso_total_embarazo" double precision NOT NULL,
	"imc_semana_40" double precision NOT NULL,
	"ganancia_peso_embarazo" double precision NOT NULL,
	"ganancia_peso_clasificacion" text NOT NULL,
	"ganancia_primer_trimestre" double precision NOT NULL,
	"ganancia_2y3_trimestre_gsem" double precision NOT NULL,
	"peso_total_embarazo_titulo4" double precision NOT NULL,
	"imc_semana_40_titulo4" double precision NOT NULL,
	"ganancia_tipo" text NOT NULL,
	"gano" double precision NOT NULL,
	"debio_ganar" double precision NOT NULL,
	"peso_a_ganar" double precision NOT NULL,
	"semanas_faltantes" integer NOT NULL,
	"gramos_por_semana" double precision NOT NULL,
	"clasificacion_gramos" text NOT NULL,
	"tasa_metabolica" double precision NOT NULL,
	"factor_actividad_fisica" double precision NOT NULL,
	"requerimiento_energia_total" double precision NOT NULL,
	"adicion_gestante" double precision NOT NULL,
	"total_energia_adicion" double precision NOT NULL,
	"metodo_1g_dia" double precision NOT NULL,
	"metodo_1_kcal" double precision NOT NULL,
	"metodo_1_amdr" double precision NOT NULL,
	"metodo_2g_dia" double precision NOT NULL,
	"metodo_2_kcal" double precision NOT NULL,
	"metodo_2_amdr" double precision NOT NULL,
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "sobre_peso_info_base_info_id_unique" UNIQUE("base_info_id")
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"gimnasio_id" integer,
	"rol_id" integer,
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "usuario_username_unique" UNIQUE("username")
);
