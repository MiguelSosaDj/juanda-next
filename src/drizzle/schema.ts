import { pgTable, serial, text, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";


// GIMNASIO
export const gimnasio = pgTable("gimnasio", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  direccion: text("direccion").notNull(),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// ROL
export const rol = pgTable("rol", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// USUARIO
export const usuario = pgTable("usuario", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  gimnasioId: integer("gimnasio_id"),
  rolId: integer("rol_id"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// ALUMNO
export const alumno = pgTable("alumno", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  telefono: text("telefono").notNull(),
  direccion: text("direccion").notNull(),
  gimnasioId: integer("gimnasio_id"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// ENTRENAMIENTO
export const entrenamiento = pgTable("entrenamiento", {
  id: serial("id").primaryKey(),
  alumnoId: integer("alumno_id"),
  semana: integer("semana"),
  peso: doublePrecision("peso"),
  tipoEntrenamiento: text("tipo_entrenamiento"),
  altura: doublePrecision("altura"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// BASEUSERINFO
export const baseUserInfo = pgTable("base_user_info", {
  id: serial("id").primaryKey(),
  gimnasioId: integer("gimnasio_id").notNull(),
  identificacion: text("identificacion").notNull(),
  nombre: text("nombre").notNull(),
  edad: integer("edad").notNull(),
  estatura: doublePrecision("estatura").notNull(),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// NINOINFO
export const ninoInfo = pgTable("nino_info", {
  id: serial("id").primaryKey(),
  baseUserInfoId: integer("base_user_info_id").notNull().unique(),
  sexo: text("sexo").notNull(),
  peso: doublePrecision("peso").notNull(),
  talla: doublePrecision("talla").notNull(),
  perimetroCefalico: doublePrecision("perimetro_cefalico").notNull(),
});

// NINOSANOINFO
export const ninoSanoInfo = pgTable("nino_sano_info", {
  id: serial("id").primaryKey(),
  baseInfoId: integer("base_info_id").notNull().unique(),
  alimentacion: text("alimentacion").notNull(),
  pt: text("pt"),
  te: text("te"),
  pce: text("pce"),
  clasificacionPt: text("clasificacion_pt"),
  clasificacionTe: text("clasificacion_te"),
  clasificacionPce: text("clasificacion_pce"),
  gananciaPesoGr: doublePrecision("ganancia_peso_gr"),
  calorias1gTejido: doublePrecision("calorias_1g_tejido"),
  vecesQueGane: integer("veces_que_gane"),
  caloriasCrecimiento: doublePrecision("calorias_crecimiento"),
  ajusteDeficit: doublePrecision("ajuste_deficit"),
  kcalTotales: doublePrecision("kcal_totales"),
  lecheMaternaExclusiva: doublePrecision("leche_materna_exclusiva"),
  formulaInfantil: doublePrecision("formula_infantil"),
  lecheMaternaYFormula: doublePrecision("leche_materna_y_formula"),
  rango118Anos: doublePrecision("rango_118_anos"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// GESTANTEINFO
export const gestanteInfo = pgTable("gestante_info", {
  id: serial("id").primaryKey(),
  baseUserInfoId: integer("base_user_info_id").notNull().unique(),
  seleccionMultiple: text("seleccion_multiple").notNull(),
  semanaGestacion: integer("semana_gestacion").notNull(),
  pesoActual: doublePrecision("peso_actual").notNull(),
  pesoPregestacional: doublePrecision("peso_pregestacional").notNull(),
  imcPregestacional: doublePrecision("imc_pregestacional").notNull(),
  imcGestacional: doublePrecision("imc_gestacional").notNull(),
  imcPregestacionalCat: text("imc_pregestacional_cat").notNull(),
});

// LACTANTEINFO
export const lactanteInfo = pgTable("lactante_info", {
  id: serial("id").primaryKey(),
  baseUserInfoId: integer("base_user_info_id").notNull().unique(),
  pesoActual: doublePrecision("peso_actual").notNull(),
  pesoPregestacional: doublePrecision("peso_pregestacional").notNull(),
  imcActual: doublePrecision("imc_actual").notNull(),
  imcCat: text("imc_cat").notNull(),
  diasPostParto: integer("dias_post_parto").notNull(),
  retencionPostParto: doublePrecision("retencion_post_parto").notNull(),
  retencionPostPartoDetalle: text("retencion_post_parto_detalle").notNull(),
  tasaMetabolica: doublePrecision("tasa_metabolica").notNull(),
  factorActividadFisica: doublePrecision("factor_actividad_fisica").notNull(),
  descripcionActividadFisica: text("descripcion_actividad_fisica").notNull(),
  requerimientoEnergia: doublePrecision("requerimiento_energia").notNull(),
  energiaExtraRequerida: doublePrecision("energia_extra_requerida").notNull(),
  requerimientoEnergiaTotal: doublePrecision("requerimiento_energia_total").notNull(),
});


// BAJOPESOINFO
export const bajoPesoInfo = pgTable("bajo_peso_info", {
  id: serial("id").primaryKey(),
  baseInfoId: integer("base_info_id").notNull().unique(),
  imcSaludable: doublePrecision("imc_saludable").notNull(),
  pesoPregestacionalSaludable: doublePrecision("peso_pregestacional_saludable").notNull(),
  gramosSemana: doublePrecision("gramos_semana").notNull(),
  ganancia1Trimestre: doublePrecision("ganancia_1_trimestre").notNull(),
  ganancia2y3TrimestreGramos: doublePrecision("ganancia_2y3_trimestre_gramos").notNull(),
  ganancia2y3TrimestreKg: doublePrecision("ganancia_2y3_trimestre_kg").notNull(),
  pesoTotalEmbarazo: doublePrecision("peso_total_embarazo").notNull(),
  pesoFinal: doublePrecision("peso_final").notNull(),
  gananciaPesoEmbarazo: doublePrecision("ganancia_peso_embarazo").notNull(),
  gananciaPesoClasificacion: text("ganancia_peso_clasificacion").notNull(),
  gananciaPrimerTrimestre: doublePrecision("ganancia_primer_trimestre").notNull(),
  ganancia2y3TrimestreGsem: doublePrecision("ganancia_2y3_trimestre_gsem").notNull(),
  pesoTotalEmbarazoTitulo4: doublePrecision("peso_total_embarazo_titulo4").notNull(),
  imcSemana40: doublePrecision("imc_semana_40").notNull(),
  gananciaTipo: text("ganancia_tipo").notNull(),
  gano: doublePrecision("gano").notNull(),
  debioGanar: doublePrecision("debio_ganar").notNull(),
  pesoAGanar: doublePrecision("peso_a_ganar").notNull(),
  semanasFaltantes: integer("semanas_faltantes").notNull(),
  gramosPorSemana: doublePrecision("gramos_por_semana").notNull(),
  clasificacionGramos: text("clasificacion_gramos").notNull(),
  tasaMetabolica: doublePrecision("tasa_metabolica").notNull(),
  factorActividadFisica: doublePrecision("factor_actividad_fisica").notNull(),
  requerimientoEnergiaTotal: doublePrecision("requerimiento_energia_total").notNull(),
  adicionGestante: doublePrecision("adicion_gestante").notNull(),
  totalEnergiaAdicion: doublePrecision("total_energia_adicion").notNull(),
  metodo1GDia: doublePrecision("metodo_1g_dia").notNull(),
  metodo1Kcal: doublePrecision("metodo_1_kcal").notNull(),
  metodo1Amdr: doublePrecision("metodo_1_amdr").notNull(),
  metodo2GDia: doublePrecision("metodo_2g_dia").notNull(),
  metodo2Kcal: doublePrecision("metodo_2_kcal").notNull(),
  metodo2Amdr: doublePrecision("metodo_2_amdr").notNull(),
});

// SOBRE_PESO_INFO
export const sobrePesoInfo = pgTable("sobre_peso_info", {
  id: serial("id").primaryKey(),
  baseInfoId: integer("base_info_id").notNull().unique(),
  imcSaludable: doublePrecision("imc_saludable").notNull(),
  pesoPregestacionalSaludable: doublePrecision("peso_pregestacional_saludable").notNull(),
  gramosSemana: doublePrecision("gramos_semana").notNull(),
  ganancia1Trimestre: doublePrecision("ganancia_1_trimestre").notNull(),
  ganancia2y3TrimestreGramos: doublePrecision("ganancia_2y3_trimestre_gramos").notNull(),
  ganancia2y3TrimestreKg: doublePrecision("ganancia_2y3_trimestre_kg").notNull(),
  gananciaTotal: doublePrecision("ganancia_total").notNull(),
  pesoTotalEmbarazo: doublePrecision("peso_total_embarazo").notNull(),
  imcSemana40: doublePrecision("imc_semana_40").notNull(),
  gananciaPesoEmbarazo: doublePrecision("ganancia_peso_embarazo").notNull(),
  gananciaPesoClasificacion: text("ganancia_peso_clasificacion").notNull(),
  gananciaPrimerTrimestre: doublePrecision("ganancia_primer_trimestre").notNull(),
  ganancia2y3TrimestreGsem: doublePrecision("ganancia_2y3_trimestre_gsem").notNull(),
  pesoTotalEmbarazoTitulo4: doublePrecision("peso_total_embarazo_titulo4").notNull(),
  imcSemana40Titulo4: doublePrecision("imc_semana_40_titulo4").notNull(),
  gananciaTipo: text("ganancia_tipo").notNull(),
  gano: doublePrecision("gano").notNull(),
  debioGanar: doublePrecision("debio_ganar").notNull(),
  pesoAGanar: doublePrecision("peso_a_ganar").notNull(),
  semanasFaltantes: integer("semanas_faltantes").notNull(),
  gramosPorSemana: doublePrecision("gramos_por_semana").notNull(),
  clasificacionGramos: text("clasificacion_gramos").notNull(),
  tasaMetabolica: doublePrecision("tasa_metabolica").notNull(),
  factorActividadFisica: doublePrecision("factor_actividad_fisica").notNull(),
  requerimientoEnergiaTotal: doublePrecision("requerimiento_energia_total").notNull(),
  adicionGestante: doublePrecision("adicion_gestante").notNull(),
  totalEnergiaAdicion: doublePrecision("total_energia_adicion").notNull(),
  metodo1GDia: doublePrecision("metodo_1g_dia").notNull(),
  metodo1Kcal: doublePrecision("metodo_1_kcal").notNull(),
  metodo1Amdr: doublePrecision("metodo_1_amdr").notNull(),
  metodo2GDia: doublePrecision("metodo_2g_dia").notNull(),
  metodo2Kcal: doublePrecision("metodo_2_kcal").notNull(),
  metodo2Amdr: doublePrecision("metodo_2_amdr").notNull(),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

// GEMELARINFO
export const gemelarInfo = pgTable("gemelar_info", {
  id: serial("id").primaryKey(),
  baseInfoId: integer("base_info_id").notNull().unique(),
  gramosSemana: doublePrecision("gramos_semana").notNull(),
  ganancia1Trimestre: doublePrecision("ganancia_1_trimestre").notNull(),
  ganancia2y3TrimestreGramos: doublePrecision("ganancia_2y3_trimestre_gramos").notNull(),
  ganancia2y3TrimestreKg: doublePrecision("ganancia_2y3_trimestre_kg").notNull(),
  pesoTotalEmbarazo: doublePrecision("peso_total_embarazo").notNull(),
  imcSemana40: doublePrecision("imc_semana_40").notNull(),
  gano: doublePrecision("gano").notNull(),
  debioGanar: doublePrecision("debio_ganar").notNull(),
  pesoAGanar: doublePrecision("peso_a_ganar").notNull(),
  semanasFaltantes: integer("semanas_faltantes").notNull(),
  gramosPorSemana: doublePrecision("gramos_por_semana").notNull(),
  clasificacionGramos: text("clasificacion_gramos").notNull(),
});
