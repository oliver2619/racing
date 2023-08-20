import { inject } from '@angular/core';
import { UrlTree } from '@angular/router';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from './app.service';

function canActivate(callback: (appService: AppService) => boolean): boolean | UrlTree {
  const appService = inject(AppService);
  const result = callback(appService);
  if (result === true) {
    return true;
  }
  const router = inject(Router);
  return router.createUrlTree(appService.defaultRoutingArray);
}

function tryLoadChampionship(appService: AppService) {
  if (!appService.isChampionship && appService.canLoadChampionship) {
    appService.loadChampionship();
  }
}

function tryLoadLast(appService: AppService) {
  if (appService.isChampionship || appService.isSingleRace) {
    return;
  }
  if (appService.lastModeWasChampionship) {
    appService.loadChampionship();
  } else if (appService.lastModeWasSingleRace) {
    appService.loadSingleRace();
  }
}

export const canActivateChampionship: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadChampionship(appService);
    return appService.isChampionship;
  });
};

export const canActivateChampionshipRaceResult: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadChampionship(appService);
    return appService.isChampionship && appService.lastRaceResults !== undefined;
  });
};

export const canActivateParcour: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadLast(appService);
    return appService.parcourVisible;
  });
};

export const canModifyParcour: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadLast(appService);
    return appService.parcourVisible && appService.canChangeParcour;
  });
};

export const canActivateRace: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadLast(appService);
    return appService.isReadyToDrive;
  });
};

export const canActivateSetupCar: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadLast(appService);
    return appService.canChangeCarSetup;
  });
};

export const canActivateWeather: CanActivateFn = (_, __) => {
  return canActivate(appService => {
    tryLoadLast(appService);
    return appService.canChangeWeather;
  });
};
