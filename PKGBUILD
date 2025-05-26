pkgname=sleex-control-center
pkgver=0.1
pkgrel=1
pkgdesc="A tool to manage system and sleex settings easily"
arch=('any')
license=('GPL3')
depends=('gtk3' 'networkmanager' 'bluez' 'bluez-utils' 'pipewire-pulse' 'brightnessctl' 'python-gobject' 'python-dbus' 'python' 'power-profiles-daemon' 'python-psutil' 'python-qrcode' 'python-setproctitle' 'gammastep' 'python-pydbus' 'python-requests' 'usbguard' 'python-pillow' 'sleex' 'power-profiles-daemon')

package() {
    set -e

    # Install stuff
    install -dm755 "$pkgdir/usr/share/sleex-control"
    install -dm755 "$pkgdir/usr/bin"
    install -dm755 "$pkgdir/usr/share/applications"

    # Install all source files
    cp -r $srcdir/* "$pkgdir/usr/share/sleex-control/"

    # Install main Python script (correct filename)
    install -Dm755 $srcdir/sleex_control.py "$pkgdir/usr/share/sleex-control/sleex_control.py"

    # Create the executable script
    echo '#!/bin/bash' > "$pkgdir/usr/bin/sleex-control"
    echo 'python3 /usr/share/sleex-control/sleex_control.py "$@"' >> "$pkgdir/usr/bin/sleex-control"
    chmod 755 "$pkgdir/usr/bin/sleex-control"

    # Install desktop file
    install -Dm755 $srcdir/sleex-control.desktop "$pkgdir/usr/share/applications/sleex-control.desktop"
}

