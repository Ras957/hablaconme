import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'portada', loadChildren: './pages/portada/portada.module#PortadaPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'privacidad', loadChildren: './modals/privacidad/privacidad.module#PrivacidadPageModule' },
  { path: 'codigo', loadChildren: './pages/codigo/codigo.module#CodigoPageModule' },
  { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'reestablecer-contraseya', loadChildren: './pages/reestablecer-contraseya/reestablecer-contraseya.module#ReestablecerContraseyaPageModule' },
  { path: 'primera-sesion', loadChildren: './pages/primera-sesion/primera-sesion.module#PrimeraSesionPageModule' },
  { path: 'pago', loadChildren: './modals/pago/pago.module#PagoPageModule' },
  { path: 'entrar-videollamada', loadChildren: './pages/entrar-videollamada/entrar-videollamada.module#EntrarVideollamadaPageModule' },
  { path: 'avatar', loadChildren: './modals/avatar/avatar.module#AvatarPageModule' },
  { path: 'llamada', loadChildren: './modals/llamada/llamada.module#LlamadaPageModule' },
  { path: 'modificar-fecha', loadChildren: './modals/modificar-fecha/modificar-fecha.module#ModificarFechaPageModule' },
  { path: 'borrar-datos-solicitud', loadChildren: './pages/borrar-datos-solicitud/borrar-datos-solicitud.module#BorrarDatosSolicitudPageModule' },
  { path: 'borrar-datos-confirmacion', loadChildren: './modals/borrar-datos-confirmacion/borrar-datos-confirmacion.module#BorrarDatosConfirmacionPageModule' },
  { path: 'borrar-datos-final', loadChildren: './pages/borrar-datos-final/borrar-datos-final.module#BorrarDatosFinalPageModule' },
  { path: 'metas', loadChildren: './modals/metas/metas.module#MetasPageModule' },
  { path: 'ayadir-editar-metas', loadChildren: './modals/ayadir-editar-metas/ayadir-editar-metas.module#AyadirEditarMetasPageModule' },
  { path: 'imagen-metas', loadChildren: './modals/imagen-metas/imagen-metas.module#ImagenMetasPageModule' },
  { path: 'mensaje-admin', loadChildren: './modals/mensaje-admin/mensaje-admin.module#MensajeAdminPageModule' },
  { path: '**', redirectTo: './tabs/tabs.module#TabsPageModule'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
