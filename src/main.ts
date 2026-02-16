import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {
  LucideAngularModule, ArrowLeft, ArrowRight, Zap, Shield, Crown, Phone, Mail,
  Facebook, Twitter, Instagram, Linkedin, Search, LayoutDashboard, LogOut, ShoppingBag,
  Menu, X, MapPin, Star, Building2, ChevronDown, ChevronUp, Save, Upload, Package,
  Settings, Share2, ExternalLink, Plus, Trash2, MoreVertical, Check, Globe, Wallet,
  Clock, Briefcase
} from 'lucide-angular';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(LucideAngularModule.pick({
      ArrowLeft, ArrowRight, Zap, Shield, Crown, Phone, Mail, Facebook, Twitter, Instagram,
      Linkedin, Search, LayoutDashboard, LogOut, ShoppingBag, Menu, X, MapPin, Star, Building2,
      ChevronDown, ChevronUp, Save, Upload, Package, Settings, Share2, ExternalLink, Plus,
      Trash2, MoreVertical, Check, Globe, Wallet, Clock, Briefcase
    }))
  ]
})
  .catch((err) => console.error(err));
