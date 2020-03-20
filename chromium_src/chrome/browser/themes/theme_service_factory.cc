/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "chrome/browser/themes/theme_service_factory.h"

#include "brave/browser/themes/brave_theme_service.h"

#define BRAVE_THEMESERVICEFACTORY_BUILDSERVICEINSTANCEFOR \
  using ThemeService = BraveThemeService;

#include "../../../../../chrome/browser/themes/theme_service_factory.cc"
#undef BRAVE_THEMESERVICEFACTORY_BUILDSERVICEINSTANCEFOR
