# Runklimpsest

Granular Particle Memory – Max for Live audio effect by R3000.

Particles fall and bounce in a chamber; every impact triggers a grain read from a 2-bar buffer, and every read wears that spot of the buffer down. A slow "dose" builds while signal is present and drives swarm size and wear.

Status: **0.2.4** – first version with sound processing (gen~, zero latency). UI milestone: tag `v0.2.0`.

- Device: `device/Runklimpsest.amxd` (keep `runklimpsest_ui.js` next to it)
- Install / usage (German): `device/LIESMICH.md`
- Concept (German): `docs/KONZEPT.md`
- Generate the device: `python3 device/build_device.py`
