/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/browser/extensions/api/binance_api.h"

#include <string>

#include "base/environment.h"
#include "brave/browser/profiles/profile_util.h"
#include "chrome/browser/profiles/profile.h"
#include "components/country_codes/country_codes.h"

namespace extensions {
namespace api {

ExtensionFunction::ResponseAction
BinanceGetUserTLDFunction::Run() {
  Profile* profile = Profile::FromBrowserContext(browser_context());
  if (brave::IsTorProfile(profile)) {
    return RespondNow(Error("Not available in Tor profile"));
  }

  const std::string us_TLD = "us";
  const std::string us_Code = "US";
  const std::string global_TLD = "com";

  const int32_t user_country_id =
      country_codes::GetCountryIDFromPrefs(profile->GetPrefs());
  const int32_t us_id = country_codes::CountryCharsToCountryID(
      us_Code.at(0), us_Code.at(1));

  const std::string user_TLD =
      (user_country_id == us_id) ? us_TLD : global_TLD;

  return RespondNow(OneArgument(
      std::make_unique<base::Value>(user_TLD)));
}

}  // namespace api
}  // namespace extensions
