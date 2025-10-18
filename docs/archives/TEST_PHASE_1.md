# 🧪 Guide de Test - Phase 1

**Date**: 18 octobre 2025  
**Phase**: Phase 1 - Restructuration App Router  

---

## 🚀 Démarrage

### 1. Lancer le serveur de développement

```bash
npm run dev
```

**Résultat attendu** :
```
✓ Ready in 2.6s
- Local:   http://localhost:3001
- Network: http://192.168.1.90:3001
```

---

## 🧪 Tests à Effectuer

### ✅ Test 1: Homepage Marketing

**URL** : http://localhost:3001/

**Attendu** :
- ✅ Hero section avec badge "10,000+ Leads"
- ✅ Titre avec gradient "Trouvez des Leads B2B Qualifiés"
- ✅ 2 CTA : "Essayer Gratuitement" + "Voir la Démo"
- ✅ Section Bénéfices (3 cards)
- ✅ CTA Final

**Navigation** :
- ✅ Logo "LeadGen AI" en haut à gauche
- ✅ Liens : Tarifs, FAQ, Demo, À propos
- ✅ Boutons : Connexion + Essayer Gratuitement
- ✅ Toggle dark mode fonctionne

**Footer** :
- ✅ 4 colonnes (Produit, Entreprise, Légal)
- ✅ Copyright

---

### ✅ Test 2: Page Pricing

**URL** : http://localhost:3001/pricing

**Attendu** :
- ✅ Titre "Tarifs simples et transparents"
- ✅ 3 cards de pricing :
  - Starter : 49€/mois
  - Pro : 99€/mois (avec badge "Le plus populaire")
  - Enterprise : 249€/mois
- ✅ Liste de features pour chaque plan
- ✅ Bouton "Commencer" sur chaque card

---

### ✅ Test 3: Page FAQ

**URL** : http://localhost:3001/faq

**Attendu** :
- ✅ Titre "Questions Fréquentes"
- ✅ 8 questions-réponses affichées
- ✅ CTA "Contactez-nous" en bas

**Questions attendues** :
1. Comment fonctionne LeadGen AI ?
2. D'où proviennent les leads ?
3. Puis-je annuler mon abonnement ?
4. Les leads sont-ils qualifiés ?
5. Période d'essai ?
6. Intégrations CRM ?
7. Sécurité des données ?
8. Changer de plan ?

---

### ✅ Test 4: Page Demo

**URL** : http://localhost:3001/demo

**Attendu** :
- ✅ Titre "Découvrez LeadGen AI en action"
- ✅ Placeholder vidéo (icône play)
- ✅ 6 cards "Ce que vous verrez" :
  - Définir client idéal
  - IA trouve leads
  - Enrichissement auto
  - Séquences email
  - Analytics temps réel
  - Intégrations CRM
- ✅ CTA final "Commencer Gratuitement"

---

### ✅ Test 5: Page About

**URL** : http://localhost:3001/about

**Attendu** :
- ✅ Titre "Notre Mission"
- ✅ Paragraphes story
- ✅ 3 cards valeurs (Qualité, Innovation, Transparence)
- ✅ Stats : 500+, 1M+, 4.9/5, 10x
- ✅ CTA contact

---

### ✅ Test 6: Dashboard

**URL** : http://localhost:3001/dashboard

**Attendu** :
- ✅ Sidebar TailAdmin (gauche)
- ✅ Header avec search + notifications + user dropdown
- ✅ Dashboard e-commerce :
  - 4 cards stats
  - Monthly Sales Chart
  - Monthly Target
  - Statistics Chart
  - Demographic Card
  - Recent Orders table

---

### ✅ Test 7: Dark Mode

**Action** : Cliquer sur le toggle dark mode (icône soleil/lune)

**Attendu** :
- ✅ Passe de light → dark (ou inverse)
- ✅ Toutes les pages s'adaptent
- ✅ Navigation + Footer changent aussi
- ✅ Dashboard change aussi

---

### ✅ Test 8: Responsive

**Tester sur différentes tailles** :

**Mobile (< 768px)** :
- ✅ Burger menu apparaît
- ✅ Navigation empilée verticalement
- ✅ Footer en colonne unique
- ✅ Hero empilé verticalement

**Tablet (768px - 1024px)** :
- ✅ Grid 2 colonnes pour bénéfices
- ✅ Navigation horizontale

**Desktop (> 1024px)** :
- ✅ Grid 3 colonnes pour bénéfices
- ✅ Toutes les features visibles

---

### ✅ Test 9: Navigation

**Parcours utilisateur** :

1. ✅ Clic sur "Tarifs" → `/pricing`
2. ✅ Clic sur "FAQ" → `/faq`
3. ✅ Clic sur "Demo" → `/demo`
4. ✅ Clic sur "À propos" → `/about`
5. ✅ Clic sur "Logo" → `/` (retour homepage)
6. ✅ Clic sur "Connexion" → `/signin`
7. ✅ Clic sur "Essayer Gratuitement" → `/signup`

---

### ✅ Test 10: Pages Auth

**URL** : http://localhost:3001/signin

**Attendu** :
- ✅ Formulaire de connexion (existant TailAdmin)

**URL** : http://localhost:3001/signup

**Attendu** :
- ✅ Formulaire d'inscription (existant TailAdmin)

---

### ✅ Test 11: Onboarding (Placeholder)

**URL** : http://localhost:3001/onboarding

**Attendu** :
- ✅ Message "Bienvenue sur LeadGen AI !"
- ✅ Texte "Le wizard d'onboarding sera disponible dans la Phase 4"
- ✅ Bouton "Accéder au Dashboard"
- ✅ Section "À venir en Phase 4" avec checklist

---

## 🐛 Tests d'Erreurs

### ✅ Test 12: Route inexistante

**URL** : http://localhost:3001/route-qui-nexiste-pas

**Attendu** :
- ✅ Page 404 Next.js par défaut

---

### ✅ Test 13: Aucun conflit de routes

**Vérification** :
```bash
npm run dev
```

**Attendu** :
- ✅ Aucune erreur "You cannot have two parallel pages"
- ✅ Le serveur démarre normalement
- ✅ `/` affiche la homepage marketing
- ✅ `/dashboard` affiche le dashboard

---

## 📊 Checklist Complète

### Pages Marketing
- [ ] `/` - Homepage
- [ ] `/pricing` - Tarifs
- [ ] `/faq` - FAQ
- [ ] `/demo` - Demo
- [ ] `/about` - À propos

### Pages Dashboard
- [ ] `/dashboard` - Dashboard principal
- [ ] `/calendar` - Calendrier
- [ ] `/profile` - Profil
- [ ] `/form-elements` - Formulaires
- [ ] `/basic-tables` - Tables
- [ ] `/bar-chart` - Graphique barres
- [ ] `/line-chart` - Graphique ligne
- [ ] `/alerts` - Alertes
- [ ] `/buttons` - Boutons
- [ ] `/images` - Images
- [ ] `/videos` - Vidéos
- [ ] `/modals` - Modales
- [ ] `/badges` - Badges
- [ ] `/avatars` - Avatars
- [ ] `/blank` - Page vierge

### Pages Auth
- [ ] `/signin` - Connexion
- [ ] `/signup` - Inscription

### Pages Placeholder
- [ ] `/onboarding` - Onboarding (Phase 4)

### Fonctionnalités
- [ ] Dark mode toggle
- [ ] Navigation fonctionnelle
- [ ] Footer complet
- [ ] Responsive mobile/tablet/desktop
- [ ] Liens internes fonctionnels
- [ ] Aucune erreur console
- [ ] Aucune erreur TypeScript
- [ ] Aucun conflit de routes

---

## 🎯 Critères de Validation

**Pour valider la Phase 1** :

✅ **Serveur démarre sans erreur**  
✅ **Toutes les routes fonctionnent**  
✅ **Dark mode fonctionne**  
✅ **Responsive fonctionne**  
✅ **Navigation fonctionne**  
✅ **Aucune erreur console**  
✅ **Aucune erreur TypeScript**  

---

## 🐛 Erreurs Connues Résolues

### ✅ Conflit Route Groups
**Erreur** : "You cannot have two parallel pages..."  
**Solution** : Déplacé `(dashboard)/page.tsx` → `(dashboard)/dashboard/page.tsx`  
**Statut** : ✅ RÉSOLU

---

## 📝 Notes

### Port utilisé
Si le port 3000 est occupé, Next.js utilise automatiquement 3001.

### Hot Reload
Toute modification devrait déclencher un hot reload automatique.

### Erreurs attendues
Aucune ! Toutes les erreurs doivent être résolues en Phase 1.

---

## ✅ Validation Finale

Si tous les tests passent :

**Phase 1 = 100% VALIDÉE** ✅

Vous pouvez passer à la **Phase 2** 🚀

---

**Prochaine étape** : Phase 2 - Composants Marketing (8-12h)

