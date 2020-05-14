import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export function enableSaveGuard() {
    if (!window.onbeforeunload) {
        window.onbeforeunload = (evt) => {
            evt.preventDefault();
            evt.returnValue = '';
            return '';
        };
    }
}

export function disableSaveGuard() {
    window.onbeforeunload = null;
}
export function isEnableSaveGuard() {
    return window.onbeforeunload !== null;
}


@Injectable({ providedIn: 'root' })
export class CanSaveDeactivateGuard implements CanDeactivate<any> {
    canDeactivate(): boolean {
        if (isEnableSaveGuard()) {
            if (confirm('تغییرات ذخیره نشده‌اند. آیا مطمئنید که میخواهید صفحه را ترک کنید؟')) {
                disableSaveGuard();
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
