
'use client'
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, ShieldAlert, FileSpreadsheet, Search, Filter, Download,
  CircleUserRound, BriefcaseBusiness, Building2, Plus, Trash2, CheckCircle2,
  AlertTriangle, ChevronRight, Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/select";

const AREAS = ["Compras", "Finanzas", "Operaciones", "RRHH", "TI", "Ventas", "Almacén"];
const CARGOS_SENSIBLES = ["Jefe", "Gerente", "Comprador Senior", "Administrador", "Auditor"];
const PARENTESCOS = ["Padre/Madre", "Hijo/a", "Cónyuge/Conviviente", "Hermano/a", "Suegro/a", "Cuñado/a"];

const FAKE_DECLARATIONS = [
  {
    id: "D-00045",
    empleado: "María López",
    dni: "47788990",
    area: "Compras",
    cargo: "Comprador Senior",
    tieneFamiliares: true,
    familiares: [
      { nombre: "Carlos López", parentesco: "Hermano/a", cargo: "Jefe de Almacén", area: "Almacén" }
    ],
    fecha: "2025-08-01",
    riesgo: "Alto",
    estado: "En evaluación"
  },
  {
    id: "D-00046",
    empleado: "Jorge Quispe",
    dni: "41122334",
    area: "Finanzas",
    cargo: "Analista",
    tieneFamiliares: true,
    familiares: [
      { nombre: "Rosa Quispe", parentesco: "Cónyuge/Conviviente", cargo: "Asistente RRHH", area: "RRHH" }
    ],
    fecha: "2025-08-03",
    riesgo: "Medio",
    estado: "Mitigado"
  },
  {
    id: "D-00047",
    empleado: "Lucía Ramos",
    dni: "46551222",
    area: "TI",
    cargo: "Desarrollador",
    tieneFamiliares: false,
    familiares: [],
    fecha: "2025-08-05",
    riesgo: "Bajo",
    estado: "Cerrado"
  }
];

function RiskBadge({ level }: { level: "Alto" | "Medio" | "Bajo" }) {
  const map = {
    "Alto": "bg-red-100 text-red-700 border-red-200",
    "Medio": "bg-amber-100 text-amber-700 border-amber-200",
    "Bajo": "bg-emerald-100 text-emerald-700 border-emerald-200",
  } as const;
  return <Badge className={`border ${map[level]} px-2 py-1 rounded-xl`}>{level}</Badge>;
}

function StatusBadge({ status }: { status: "En evaluación" | "Mitigado" | "Cerrado" }) {
  const map = {
    "En evaluación": { cls: "bg-slate-100 text-slate-700 border-slate-200", icon: <Eye className="h-3.5 w-3.5"/> },
    "Mitigado": { cls: "bg-blue-100 text-blue-700 border-blue-200", icon: <CheckCircle2 className="h-3.5 w-3.5"/> },
    "Cerrado": { cls: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="h-3.5 w-3.5"/> },
  } as const;
  const m = map[status];
  return <Badge className={`gap-1.5 border ${m.cls} px-2 py-1 rounded-xl`}>{m.icon}{status}</Badge>;
}

function Metric({ icon, title, value, sub }: any){
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center gap-3">
        <div className="rounded-2xl p-2 border bg-white shadow-sm">{icon}</div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{sub}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}

function HRTable({ rows }: { rows: typeof FAKE_DECLARATIONS }){
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Empleado</th>
            <th className="text-left p-3">Área</th>
            <th className="text-left p-3">Cargo</th>
            <th className="text-left p-3">Familiares</th>
            <th className="text-left p-3">Riesgo</th>
            <th className="text-left p-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t hover:bg-slate-50/80">
              <td className="p-3 font-medium text-slate-700">{r.id}</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <CircleUserRound className="h-4 w-4"/>
                  <div>
                    <div className="font-medium">{r.empleado}</div>
                    <div className="text-xs text-slate-500">DNI {r.dni}</div>
                  </div>
                </div>
              </td>
              <td className="p-3">{r.area}</td>
              <td className="p-3">{r.cargo}</td>
              <td className="p-3 text-slate-600">{r.tieneFamiliares ? r.familiares.map(f=> f.nombre).join(", ") : "—"}</td>
              <td className="p-3"><RiskBadge level={r.riesgo as any} /></td>
              <td className="p-3"><StatusBadge status={r.estado as any} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeclarationForm(){
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [cargo, setCargo] = useState("");
  const [tieneFamiliares, setTieneFamiliares] = useState(false);
  const [familiares, setFamiliares] = useState<any[]>([]);
  const [nota, setNota] = useState("");
  const [enviando, setEnviando] = useState(false);
  
  const addFamiliar = () => setFamiliares(prev => [...prev, { nombre: "", parentesco: PARENTESCOS[0], cargo: "", area: AREAS[0] }]);
  const removeFamiliar = (i:number) => setFamiliares(prev => prev.filter((_,idx)=> idx!==i));

  const canSubmit = useMemo(()=>{
    if(!nombre || !dni || !cargo) return false;
    if(tieneFamiliares && familiares.length===0) return false;
    if(tieneFamiliares && familiares.some(f=> !f.nombre || !f.cargo)) return false;
    return true;
  }, [nombre, dni, cargo, tieneFamiliares, familiares]);

  const onSubmit = async () => {
    setEnviando(true);
    await new Promise(r=> setTimeout(r, 900));
    setEnviando(false);
    alert("Declaración enviada. RRHH evaluará su caso.\nCódigo: D-00XYZ");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Declaración de Conflicto de Interés</CardTitle>
        <CardDescription>Complete la información y declare si tiene familiares dentro de Inversiones FISA S.A.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Nombre completo</Label>
            <Input value={nombre} onChange={e=> setNombre(e.target.value)} placeholder="Ej. Juan Pérez"/>
          </div>
          <div>
            <Label>DNI</Label>
            <Input value={dni} onChange={e=> setDni(e.target.value)} placeholder="########"/>
          </div>
          <div>
            <Label>Área</Label>
            <NativeSelect value={area} onValueChange={setArea} options={AREAS} />
          </div>
          <div>
            <Label>Cargo</Label>
            <Input value={cargo} onChange={e=> setCargo(e.target.value)} placeholder="Ej. Analista"/>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border p-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5"/>
            <div>
              <div className="font-medium">¿Tiene familiares directos trabajando en la empresa?</div>
              <div className="text-xs text-slate-500">Padres, hijos, cónyuge/conviviente, hermanos, suegros, cuñados.</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">No</span>
            <Switch checked={tieneFamiliares} onCheckedChange={setTieneFamiliares}/>
            <span className="text-sm">Sí</span>
          </div>
        </div>

        {tieneFamiliares && (
          <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">Detalle de familiares</div>
              <Button onClick={addFamiliar} variant="secondary" className="rounded-xl"><Plus className="h-4 w-4 mr-1"/>Agregar</Button>
            </div>
            {familiares.length===0 && (
              <div className="text-sm text-slate-500">Agregue al menos un familiar.</div>
            )}
            <div className="space-y-3">
              {familiares.map((f, i)=> (
                <div key={i} className="grid md:grid-cols-12 gap-2 border rounded-xl p-3 bg-white">
                  <div className="md:col-span-3">
                    <Label>Nombre</Label>
                    <Input value={f.nombre} onChange={e=> setFamiliares(prev=> prev.map((x,idx)=> idx===i ? {...x, nombre: e.target.value} : x))}/>
                  </div>
                  <div className="md:col-span-3">
                    <Label>Parentesco</Label>
                    <NativeSelect value={f.parentesco} onValueChange={(v:string)=> setFamiliares(prev=> prev.map((x,idx)=> idx===i ? {...x, parentesco: v} : x))} options={PARENTESCOS} />
                  </div>
                  <div className="md:col-span-3">
                    <Label>Cargo</Label>
                    <Input value={f.cargo} onChange={e=> setFamiliares(prev=> prev.map((x,idx)=> idx===i ? {...x, cargo: e.target.value} : x))}/>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Área</Label>
                    <NativeSelect value={f.area} onValueChange={(v:string)=> setFamiliares(prev=> prev.map((x,idx)=> idx===i ? {...x, area: v} : x))} options={AREAS} />
                  </div>
                  <div className="md:col-span-1 flex items-end justify-end">
                    <Button variant="ghost" className="text-red-600 hover:text-red-700" onClick={()=> removeFamiliar(i)}>
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                  <div className="md:col-span-12">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5"/>
                      {CARGOS_SENSIBLES.some(cs=> f.cargo?.toLowerCase().includes(cs.toLowerCase()))
                        ? <span>Posición potencialmente sensible. RRHH revisará independencia.</span>
                        : <span>Revise que el familiar no tenga dependencia jerárquica directa con usted.</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div>
          <Label>Comentarios (opcional)</Label>
          <Textarea value={nota} onChange={e=> setNota(e.target.value)} placeholder="Información relevante para la evaluación de RRHH"/>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ChevronRight className="h-3.5 w-3.5"/>
            Al enviar, usted declara que la información es veraz y acepta las medidas de independencia.
          </div>
          <Button disabled={!canSubmit || enviando} onClick={onSubmit} className="rounded-xl">
            {!enviando ? <><ShieldAlert className="h-4 w-4 mr-2"/>Enviar declaración</> : "Enviando…"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AppMockConflictoInteres(){
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string|undefined>(undefined);
  const [riskFilter, setRiskFilter] = useState<string|undefined>(undefined);
  const [soloConFamiliares, setSoloConFamiliares] = useState(false);

  const filtered = useMemo(()=>{
    return FAKE_DECLARATIONS.filter(d=>{
      if(query && !(`${d.empleado} ${d.dni}`.toLowerCase().includes(query.toLowerCase()))) return false;
      if(areaFilter && d.area !== areaFilter) return false;
      if(riskFilter && d.riesgo !== riskFilter) return false;
      if(soloConFamiliares && !d.tieneFamiliares) return false;
      return true;
    });
  }, [query, areaFilter, riskFilter, soloConFamiliares]);

  const metrics = useMemo(()=>{
    const total = FAKE_DECLARATIONS.length;
    const conFam = FAKE_DECLARATIONS.filter(d=> d.tieneFamiliares).length;
    const alto = FAKE_DECLARATIONS.filter(d=> d.riesgo === "Alto").length;
    const pendientes = FAKE_DECLARATIONS.filter(d=> d.estado === "En evaluación").length;
    return { total, conFam, alto, pendientes };
  }, []);

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-slate-50 to-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">FISA · Declaración de Conflicto de Interés</h1>
            <p className="text-slate-500">Plataforma interna para registro, evaluación y monitoreo de vínculos familiares.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" className="rounded-xl"><Download className="h-4 w-4 mr-2"/>Exportar (Excel)</Button>
            <Button variant="outline" className="rounded-xl"><FileSpreadsheet className="h-4 w-4 mr-2"/>Reporte mensual</Button>
          </div>
        </div>

        <Tabs defaultValue="colaborador" className="">
          <TabsList className="grid grid-cols-2 w-full md:w-auto gap-2 p-1 bg-slate-100 rounded-xl">
            <TabsTrigger value="colaborador">Vista colaborador</TabsTrigger>
            <TabsTrigger value="rrhh">Vista RRHH</TabsTrigger>
          </TabsList>
          <TabsContent value="colaborador" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DeclarationForm/>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Política y criterios</CardTitle>
                    <CardDescription>Resumen rápido</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2"><ShieldAlert className="h-4 w-4 mt-0.5"/>Declaración anual obligatoria o ante cualquier cambio.</div>
                    <div className="flex items-start gap-2"><BriefcaseBusiness className="h-4 w-4 mt-0.5"/>Abstenerse de participar en decisiones relacionadas.</div>
                    <div className="flex items-start gap-2"><Building2 className="h-4 w-4 mt-0.5"/>Dependencia jerárquica directa entre familiares: no permitida.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Soporte</CardTitle>
                    <CardDescription>¿Dudas o ajustes?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4"/>Contacte a RRHH</div>
                    <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4"/>Reporte un incidente</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rrhh" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <Metric icon={<Users className="h-5 w-5"/>} title="Declaraciones" value={metrics.total} sub="presentadas"/>
                  <Metric icon={<ShieldAlert className="h-5 w-5"/>} title="Con familiares" value={metrics.conFam} sub="requieren revisión"/>
                  <Metric icon={<AlertTriangle className="h-5 w-5"/>} title="Riesgo alto" value={metrics.alto} sub="priorizar"/>
                  <Metric icon={<CheckCircle2 className="h-5 w-5"/>} title="Pendientes" value={metrics.pendientes} sub="en evaluación"/>
                </div>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Declaraciones recibidas</CardTitle>
                    <CardDescription>Filtre por área, riesgo y búsquedas por nombre o DNI.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-3">
                      <div className="md:col-span-2 flex items-center gap-2">
                        <Search className="h-4 w-4 text-slate-400"/>
                        <Input value={query} onChange={e=> setQuery(e.target.value)} placeholder="Buscar por nombre o DNI"/>
                      </div>
                      <div>
                        <NativeSelect value={areaFilter || ""} onValueChange={(v:string)=> setAreaFilter(v || undefined)} options={["", ...AREAS]} />
                      </div>
                      <div>
                        <NativeSelect value={riskFilter || ""} onValueChange={(v:string)=> setRiskFilter(v || undefined)} options={["","Bajo","Medio","Alto"]} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="rounded-xl"><Filter className="h-4 w-4 mr-2"/>Filtros</Button>
                      <div className="flex items-center gap-2 text-sm">
                        <Switch checked={soloConFamiliares} onCheckedChange={setSoloConFamiliares}/>
                        <span>Solo con familiares declarados</span>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" className="rounded-xl"><Download className="h-4 w-4 mr-2"/>Exportar Excel</Button>
                      </div>
                    </div>

                    <HRTable rows={filtered as any}/>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reglas de mitigación</CardTitle>
                    <CardDescription>Acciones sugeridas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5"/>Separar líneas de reporte entre familiares.</div>
                    <div className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5"/>Designar revisor independiente para compras o evaluaciones.</div>
                    <div className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5"/>Bloquear aprobaciones si existe parentesco directo.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bitácora / Auditoría</CardTitle>
                    <CardDescription>Últimos movimientos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between"><span>María López · reasignación de aprobador</span><StatusBadge status="Mitigado"/></div>
                    <div className="flex items-center justify-between"><span>Jorge Quispe · revisión de RRHH</span><StatusBadge status="En evaluación"/></div>
                    <div className="flex items-center justify-between"><span>Lucía Ramos · cierre automático</span><StatusBadge status="Cerrado"/></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
