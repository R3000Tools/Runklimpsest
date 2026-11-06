# Runklimpsest

Granular Particle Memory – Max for Live audio effect by R3000.

Particles fall and bounce in a chamber; every impact triggers a grain read from a 2-bar buffer, and every read wears that spot of the buffer down. A slow "dose" builds while signal is present and drives swarm size and wear.

Status: **UI prototype 0.2.0 ("UI complete", tag `v0.2.0`); sound processing starts with 0.3.0** – no audio processing yet (audio passes through).

- Device: `device/Runklimpsest.amxd` (keep `runklimpsest_ui.js` next to it)
- Install / usage (German): `device/LIESMICH.md`
- Concept (German): `docs/KONZEPT.md`
- Generate the device: `python3 device/build_device.py`
