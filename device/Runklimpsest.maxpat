{
 "patcher": {
  "fileversion": 1,
  "appversion": {
   "major": 8,
   "minor": 6,
   "revision": 0,
   "architecture": "x64",
   "modernui": 1
  },
  "classnamespace": "box",
  "rect": [
   80.0,
   80.0,
   1200.0,
   820.0
  ],
  "openrect": [
   0.0,
   0.0,
   580.0,
   169.0
  ],
  "openinpresentation": 1,
  "devicewidth": 580.0,
  "description": "Runklimpsest UI prototype - granular particle memory (no audio processing yet)",
  "boxes": [
   {
    "box": {
     "id": "obj-1",
     "maxclass": "jsui",
     "patching_rect": [
      190,
      20,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      0,
      0,
      580,
      169
     ],
     "filename": "runklimpsest_ui.js",
     "jsarguments": [
      "device"
     ],
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ],
     "border": 0
    }
   },
   {
    "box": {
     "id": "obj-2",
     "maxclass": "live.numbox",
     "patching_rect": [
      360,
      20,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "gravity",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Gravity",
       "parameter_shortname": "GRAVITY",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 0.0,
       "parameter_mmax": 1.0,
       "parameter_unitstyle": 9,
       "parameter_units": "%.2f g"
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-3",
     "maxclass": "live.numbox",
     "patching_rect": [
      530,
      20,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "bounce",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Bounce",
       "parameter_shortname": "BOUNCE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        50.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 0.0,
       "parameter_mmax": 100.0,
       "parameter_unitstyle": 5
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-4",
     "maxclass": "live.numbox",
     "patching_rect": [
      700,
      20,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "swarm",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Swarm",
       "parameter_shortname": "SWARM",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        4
       ],
       "parameter_type": 1,
       "parameter_mmin": 1,
       "parameter_mmax": 24,
       "parameter_unitstyle": 0
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-5",
     "maxclass": "live.numbox",
     "patching_rect": [
      870,
      20,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "erosion",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Erosion",
       "parameter_shortname": "EROSION",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        65.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 0.0,
       "parameter_mmax": 100.0,
       "parameter_unitstyle": 5
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-6",
     "maxclass": "live.numbox",
     "patching_rect": [
      20,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "mix",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Mix",
       "parameter_shortname": "MIX",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        50.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 0.0,
       "parameter_mmax": 100.0,
       "parameter_unitstyle": 5
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-7",
     "maxclass": "live.numbox",
     "patching_rect": [
      190,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "grain",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Grain",
       "parameter_shortname": "GRAIN",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        30.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 5.0,
       "parameter_mmax": 500.0,
       "parameter_unitstyle": 2,
       "parameter_exponent": 2.0
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-8",
     "maxclass": "live.numbox",
     "patching_rect": [
      360,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "heal",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Heal",
       "parameter_shortname": "HEAL",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        40.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 0.5,
       "parameter_mmax": 60.0,
       "parameter_unitstyle": 9,
       "parameter_units": "%.1f s",
       "parameter_exponent": 2.0
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-9",
     "maxclass": "live.numbox",
     "patching_rect": [
      530,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "rate",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Rate",
       "parameter_shortname": "RATE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        8.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 1.0,
       "parameter_mmax": 32.0,
       "parameter_unitstyle": 9,
       "parameter_units": "%.0f bars"
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-10",
     "maxclass": "live.numbox",
     "patching_rect": [
      700,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "recover",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Recover",
       "parameter_shortname": "RECOVER",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        16.0
       ],
       "parameter_type": 0,
       "parameter_mmin": 1.0,
       "parameter_mmax": 64.0,
       "parameter_unitstyle": 9,
       "parameter_units": "%.0f bars"
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-11",
     "maxclass": "live.numbox",
     "patching_rect": [
      870,
      54,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "output",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Output",
       "parameter_shortname": "OUTPUT",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0.0
       ],
       "parameter_type": 0,
       "parameter_mmin": -24.0,
       "parameter_mmax": 12.0,
       "parameter_unitstyle": 4
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-12",
     "maxclass": "live.numbox",
     "patching_rect": [
      20,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "freeze",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Freeze",
       "parameter_shortname": "FREEZE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "off",
        "on"
       ],
       "parameter_mmax": 1
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-13",
     "maxclass": "live.numbox",
     "patching_rect": [
      190,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "sync",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Sync",
       "parameter_shortname": "SYNC",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        1
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "off",
        "on"
       ],
       "parameter_mmax": 1
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-14",
     "maxclass": "live.numbox",
     "patching_rect": [
      360,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "division",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Division",
       "parameter_shortname": "DIVISION",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        2
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "1/4",
        "1/8",
        "1/16",
        "1/32"
       ],
       "parameter_mmax": 3
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-15",
     "maxclass": "live.numbox",
     "patching_rect": [
      530,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "weartype",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Wear Type",
       "parameter_shortname": "WEAR TYPE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "SAT",
        "TAPE",
        "BIT"
       ],
       "parameter_mmax": 2
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-16",
     "maxclass": "live.numbox",
     "patching_rect": [
      700,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "target",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Target",
       "parameter_shortname": "DOSE TARGET",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        2
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "ALL",
        "SWARM",
        "WEAR"
       ],
       "parameter_mmax": 2
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-17",
     "maxclass": "live.text",
     "patching_rect": [
      870,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ],
     "mode": 0,
     "text": "RESET DOSE",
     "texton": "RESET DOSE",
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bgoncolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgoncolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textoncolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextoncolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "varname": "resetdose",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Reset",
       "parameter_shortname": "DOSE RESET",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "off",
        "on"
       ],
       "parameter_mmax": 1
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-18",
     "maxclass": "live.numbox",
     "patching_rect": [
      20,
      122,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "activeslidercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.01
     ],
     "appearance": 0,
     "varname": "stereo",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Stereo",
       "parameter_shortname": "STEREO",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0
       ],
       "parameter_type": 2,
       "parameter_enum": [
        "STEREO",
        "MONO"
       ],
       "parameter_mmax": 1
      }
     }
    }
   },
   {
    "box": {
     "id": "obj-19",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      122,
      150,
      22
     ],
     "text": "route gravity bounce swarm erosion mix grain heal rate recover output freeze sync division weartype target resetdose stereo",
     "numinlets": 1,
     "numoutlets": 18,
     "outlettype": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-20",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      122,
      150,
      22
     ],
     "text": "s ---gravity_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-21",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      122,
      150,
      22
     ],
     "text": "s ---bounce_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-22",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      122,
      150,
      22
     ],
     "text": "s ---swarm_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-23",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      122,
      150,
      22
     ],
     "text": "s ---erosion_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-24",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      156,
      150,
      22
     ],
     "text": "s ---mix_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-25",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      156,
      150,
      22
     ],
     "text": "s ---grain_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-26",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      156,
      150,
      22
     ],
     "text": "s ---heal_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-27",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      156,
      150,
      22
     ],
     "text": "s ---rate_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-28",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      156,
      150,
      22
     ],
     "text": "s ---recover_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-29",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      156,
      150,
      22
     ],
     "text": "s ---output_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-30",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      190,
      150,
      22
     ],
     "text": "s ---freeze_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-31",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      190,
      150,
      22
     ],
     "text": "s ---sync_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-32",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      190,
      150,
      22
     ],
     "text": "s ---division_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-33",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      190,
      150,
      22
     ],
     "text": "s ---weartype_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-34",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      190,
      150,
      22
     ],
     "text": "s ---target_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-35",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      190,
      150,
      22
     ],
     "text": "s ---resetdose_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-36",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      224,
      150,
      22
     ],
     "text": "s ---stereo_c",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-37",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      224,
      150,
      22
     ],
     "text": "r ---rk_param",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-38",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      224,
      150,
      22
     ],
     "text": "r ---rk_refresh",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-39",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      224,
      150,
      22
     ],
     "text": "prepend gravity",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-40",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      224,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-41",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      224,
      150,
      22
     ],
     "text": "r ---gravity_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-42",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      258,
      150,
      22
     ],
     "text": "prepend bounce",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-43",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      258,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-44",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      258,
      150,
      22
     ],
     "text": "r ---bounce_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-45",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      258,
      150,
      22
     ],
     "text": "prepend swarm",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-46",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      258,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-47",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      258,
      150,
      22
     ],
     "text": "r ---swarm_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-48",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      292,
      150,
      22
     ],
     "text": "prepend erosion",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-49",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      292,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-50",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      292,
      150,
      22
     ],
     "text": "r ---erosion_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-51",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      292,
      150,
      22
     ],
     "text": "prepend mix",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-52",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      292,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-53",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      292,
      150,
      22
     ],
     "text": "r ---mix_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-54",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      326,
      150,
      22
     ],
     "text": "prepend grain",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-55",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      326,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-56",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      326,
      150,
      22
     ],
     "text": "r ---grain_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-57",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      326,
      150,
      22
     ],
     "text": "prepend heal",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-58",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      326,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-59",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      326,
      150,
      22
     ],
     "text": "r ---heal_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-60",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      360,
      150,
      22
     ],
     "text": "prepend rate",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-61",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      360,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-62",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      360,
      150,
      22
     ],
     "text": "r ---rate_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-63",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      360,
      150,
      22
     ],
     "text": "prepend recover",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-64",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      360,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-65",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      360,
      150,
      22
     ],
     "text": "r ---recover_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-66",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      394,
      150,
      22
     ],
     "text": "prepend output",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-67",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      394,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-68",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      394,
      150,
      22
     ],
     "text": "r ---output_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-69",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      394,
      150,
      22
     ],
     "text": "prepend freeze",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-70",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      394,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-71",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      394,
      150,
      22
     ],
     "text": "r ---freeze_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-72",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      428,
      150,
      22
     ],
     "text": "prepend sync",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-73",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      428,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-74",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      428,
      150,
      22
     ],
     "text": "r ---sync_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-75",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      428,
      150,
      22
     ],
     "text": "prepend division",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-76",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      428,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-77",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      428,
      150,
      22
     ],
     "text": "r ---division_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-78",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      462,
      150,
      22
     ],
     "text": "prepend weartype",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-79",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      462,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-80",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      462,
      150,
      22
     ],
     "text": "r ---weartype_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-81",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      462,
      150,
      22
     ],
     "text": "prepend target",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-82",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      462,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-83",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      462,
      150,
      22
     ],
     "text": "r ---target_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-84",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      496,
      150,
      22
     ],
     "text": "prepend resetdose",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-85",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      496,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-86",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      496,
      150,
      22
     ],
     "text": "r ---resetdose_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-87",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      496,
      150,
      22
     ],
     "text": "prepend stereo",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-88",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      496,
      150,
      22
     ],
     "text": "s ---rk_param",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-89",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      496,
      150,
      22
     ],
     "text": "r ---stereo_c",
     "numinlets": 0,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-90",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      530,
      150,
      22
     ],
     "text": "live.thisdevice",
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "bang",
      "int",
      "int"
     ]
    }
   },
   {
    "box": {
     "id": "obj-91",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      530,
      150,
      22
     ],
     "text": "t 1 b b",
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "int",
      "bang",
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-92",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      530,
      150,
      22
     ],
     "text": "s ---rk_refresh",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-93",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      530,
      150,
      22
     ],
     "text": "qmetro 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-94",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      530,
      150,
      22
     ],
     "text": "t b b",
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "bang",
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-95",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      530,
      150,
      22
     ],
     "text": "s ---rk_draw",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-96",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      564,
      150,
      22
     ],
     "text": "metro 16n",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-97",
     "maxclass": "message",
     "patching_rect": [
      190,
      564,
      150,
      22
     ],
     "text": "tick",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-98",
     "maxclass": "message",
     "patching_rect": [
      360,
      564,
      150,
      22
     ],
     "text": "path live_set",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-99",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      564,
      150,
      22
     ],
     "text": "live.path",
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "",
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-100",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      564,
      150,
      22
     ],
     "text": "live.observer @property tempo",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-101",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      564,
      150,
      22
     ],
     "text": "prepend tempo",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-102",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      598,
      150,
      22
     ],
     "text": "live.observer @property signature_numerator",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-103",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      598,
      150,
      22
     ],
     "text": "prepend signum",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-104",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      598,
      150,
      22
     ],
     "text": "live.observer @property signature_denominator",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-105",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      598,
      150,
      22
     ],
     "text": "prepend sigden",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-106",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      598,
      150,
      22
     ],
     "text": "sel 0 1 2 3",
     "numinlets": 2,
     "numoutlets": 5,
     "outlettype": [
      "bang",
      "bang",
      "bang",
      "bang",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-107",
     "maxclass": "message",
     "patching_rect": [
      870,
      598,
      150,
      22
     ],
     "text": "interval 4n",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-108",
     "maxclass": "message",
     "patching_rect": [
      20,
      632,
      150,
      22
     ],
     "text": "interval 8n",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-109",
     "maxclass": "message",
     "patching_rect": [
      190,
      632,
      150,
      22
     ],
     "text": "interval 16n",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-110",
     "maxclass": "message",
     "patching_rect": [
      360,
      632,
      150,
      22
     ],
     "text": "interval 32n",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-111",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      632,
      150,
      22
     ],
     "text": "gen~ @ev ---rkev @ov ---rkov",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "signal",
      "signal"
     ],
     "patcher": {
      "fileversion": 1,
      "appversion": {
       "major": 8,
       "minor": 6,
       "revision": 0,
       "architecture": "x64",
       "modernui": 1
      },
      "classnamespace": "dsp.gen",
      "rect": [
       100.0,
       100.0,
       820.0,
       780.0
      ],
      "boxes": [
       {
        "box": {
         "id": "gen-1",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          20,
          30,
          22
         ],
         "text": "in 1",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "gen-2",
         "maxclass": "newobj",
         "patching_rect": [
          200,
          20,
          30,
          22
         ],
         "text": "in 2",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "gen-3",
         "maxclass": "codebox",
         "patching_rect": [
          20,
          60,
          760,
          640
         ],
         "code": "// Runklimpsest audio engine - gen~ codebox (GenExpr).\n// build_device.py embeds this file into [gen~ @ev ---rkev]; tests/audio_sim.js transpiles\n// the same file to JavaScript and renders it, so the shipped code is the tested code.\n// Keep to the subset the transpiler understands: one declaration per line, C-style\n// statements, no user functions, locals assigned before use, loops \"v += 1\".\n//\n// Signal flow\n//   input -> record (2 bars, \"fresh\" + \"worn\" copies) unless FREEZE\n//   grain events (from the particle engine via buffer~ ---rkev) -> 32 voices\n//   each voice reads \"worn\", outputs the grain and writes a degraded copy back\n//   (palimpsest: reading wears the source), HEAL sweeps worn back toward fresh\n//   grains: mono sum, constant-power pan from X (+-70 %) or centre (MONO)\n//   wet: density normalisation, DC blocker -> equal-power MIX -> OUTPUT -> soft clip\n//   display: overview of the buffer (256 columns) in buffer~ ---rkov, read by the jsui\n// Latency: 0 samples (grains read from the past, dry is not delayed).\n\nParam p_mix(50);\nParam p_out(0);\nParam p_grain(30);\nParam p_erosion(65);\nParam p_weartype(0);\nParam p_heal(40);\nParam p_freeze(0);\nParam p_stereo(0);\nParam p_dose(0);\nParam p_target(0);\nParam p_barsec(2);\nParam p_evhead(0);\nBuffer ev(\"rkev\");\nBuffer ov(\"rkov\");\nData fresh(800000, 2);\nData worn(800000, 2);\nData vs(32, 19);\nData wdl(64, 2);\nHistory wpos(0);\nHistory healpos(0);\nHistory lasthead(0);\nHistory smix(0.5);\nHistory sout(1);\nHistory sload(1);\nHistory dryms(0);\nHistory wetms(0);\nHistory agc(1);\nHistory wdi(0);\nHistory lenv(0);\nHistory lgain(1);\nHistory dcxl(0);\nHistory dcyl(0);\nHistory dcxr(0);\nHistory dcyr(0);\nHistory ovpos(0);\nHistory ocol(0);\nHistory afp(0);\nHistory awp(0);\nHistory aws(0);\nHistory afs(0);\nHistory ads(0);\nHistory acnt(0);\nHistory hcol(-1);\nHistory hfp(0);\nHistory hss(0);\nHistory hn(0);\n\n// ---------------------------------------------------------------- constants\ncap = 800000;\nblen = clamp(floor(p_barsec * 2 * samplerate), 4096, cap);\nevslots = 64;\nmaxv = 32;\n\n// ---------------------------------------------------------------- record\nif (p_freeze < 0.5) {\n\twi = wpos;\n\tif (wi >= blen) {\n\t\twi = 0;\n\t}\n\tpoke(fresh, in1, wi, 0);\n\tpoke(fresh, in2, wi, 1);\n\tpoke(worn, in1, wi, 0);\n\tpoke(worn, in2, wi, 1);\n\twpos = wi + 1;\n\t// display: the column under the write head is rebuilt live from the incoming audio\n\t// (0.2.8: the background scan alone took up to 1 s per pass - MEMORY built up in steps)\n\twcol = floor(wi * 256 / blen);\n\twm = (in1 + in2) * 0.5;\n\tif (wcol != hcol) {\n\t\thfp = 0;\n\t\thss = 0;\n\t\thn = 0;\n\t\thcol = wcol;\n\t}\n\thfp = max(hfp, abs(wm));\n\thss = hss + wm * wm;\n\thn = hn + 1;\n\tpoke(ov, hfp, wcol * 4, 0);\n\tpoke(ov, hfp, wcol * 4 + 1, 0);\n\tpoke(ov, sqrt(hss / hn), wcol * 4 + 2, 0);\n\tpoke(ov, 0, wcol * 4 + 3, 0);\n}\n\n// ---------------------------------------------------------------- heal sweep\n// one buffer position per sample; a full sweep takes blen samples, so the per-sweep\n// pull toward \"fresh\" is 1 - exp(-sweep / HEAL) -> time constant = HEAL seconds\nhi = healpos;\nif (hi >= blen) {\n\thi = 0;\n}\nhk = 1 - exp(-(blen / samplerate) / max(0.1, p_heal));\nhfl = peek(fresh, hi, 0);\nhfr = peek(fresh, hi, 1);\nhwl = peek(worn, hi, 0);\nhwr = peek(worn, hi, 1);\npoke(worn, hwl + (hfl - hwl) * hk, hi, 0);\npoke(worn, hwr + (hfr - hwr) * hk, hi, 1);\nhealpos = hi + 1;\n\n// ---------------------------------------------------------------- display overview\n// 256 columns x 4 values in buffer~ ---rkov (index col * 4 + k): fresh peak, worn peak,\n// worn rms, wear (rms of worn - fresh relative to fresh rms, 0..1); index 1024 = write head\n// position 0..1. Scans 4 buffer positions per sample: a 2-bar loop at 120 BPM in 1 s.\novn = 256;\novi = ovpos;\noc0 = ocol;\nqfp = afp;\nqwp = awp;\nqws = aws;\nqfs = afs;\nqds = ads;\nqn = acnt;\nfor (oqi = 0; oqi < 4; oqi += 1) {\n\tif (ovi >= blen) {\n\t\tovi = 0;\n\t}\n\tovc = floor(ovi * ovn / blen);\n\tif (ovc != oc0) {\n\t\tocn = max(1, qn);\n\t\tofr = sqrt(qfs / ocn);\n\t\tpoke(ov, qfp, oc0 * 4, 0);\n\t\tpoke(ov, qwp, oc0 * 4 + 1, 0);\n\t\tpoke(ov, sqrt(qws / ocn), oc0 * 4 + 2, 0);\n\t\tpoke(ov, clamp(sqrt(qds / ocn) / max(ofr, 0.003), 0, 1), oc0 * 4 + 3, 0);\n\t\tqfp = 0;\n\t\tqwp = 0;\n\t\tqws = 0;\n\t\tqfs = 0;\n\t\tqds = 0;\n\t\tqn = 0;\n\t\toc0 = ovc;\n\t}\n\tofm = (peek(fresh, ovi, 0) + peek(fresh, ovi, 1)) * 0.5;\n\towm = (peek(worn, ovi, 0) + peek(worn, ovi, 1)) * 0.5;\n\tqfp = max(qfp, abs(ofm));\n\tqwp = max(qwp, abs(owm));\n\tqws = qws + owm * owm;\n\tqfs = qfs + ofm * ofm;\n\tqds = qds + (owm - ofm) * (owm - ofm);\n\tqn = qn + 1;\n\tovi = ovi + 1;\n}\novpos = ovi;\nocol = oc0;\nafp = qfp;\nawp = qwp;\naws = qws;\nafs = qfs;\nads = qds;\nacnt = qn;\npoke(ov, wpos / blen, ovn * 4, 0);\n\n// ---------------------------------------------------------------- grain events\n// slot k (1..63, 0) holds pos, amp, pan x, delay ms at k*4 .. k*4+3\nhead = floor(p_evhead);\nif (head != lasthead) {\n\tek = lasthead;\n\tfor (j = 0; j < evslots; j += 1) {\n\t\tif (ek != head) {\n\t\t\tek = ek + 1;\n\t\t\tif (ek >= evslots) {\n\t\t\t\tek = 0;\n\t\t\t}\n\t\t\teb = ek * 4;\n\t\t\tepos = peek(ev, eb, 0);\n\t\t\teamp = peek(ev, eb + 1, 0);\n\t\t\tex = peek(ev, eb + 2, 0);\n\t\t\tedel = peek(ev, eb + 3, 0);\n\t\t\t// free voice first, else steal the one closest to its end\n\t\t\tbest = 0;\n\t\t\tbestscore = -1;\n\t\t\tfor (v = 0; v < maxv; v += 1) {\n\t\t\t\tvact = peek(vs, v, 0);\n\t\t\t\tvscore = 2;\n\t\t\t\tif (vact > 0.5) {\n\t\t\t\t\tvscore = peek(vs, v, 2) / max(1, peek(vs, v, 3));\n\t\t\t\t}\n\t\t\t\tif (vscore > bestscore) {\n\t\t\t\t\tbestscore = vscore;\n\t\t\t\t\tbest = v;\n\t\t\t\t}\n\t\t\t}\n\t\t\tglen = max(48, floor(mstosamps(p_grain * (1 + 0.08 * noise()))));\n\t\t\tgstart = floor(clamp(epos, 0, 1) * (blen - 1));\n\t\t\t// never read across the write head (newest meets oldest audio = click):\n\t\t\t// such grains start right behind the head instead\n\t\t\tif (p_freeze < 0.5) {\n\t\t\t\tgdist = wpos - gstart;\n\t\t\t\tif (gdist < 0) {\n\t\t\t\t\tgdist = gdist + blen;\n\t\t\t\t}\n\t\t\t\tif (gdist < glen + 64) {\n\t\t\t\t\tgstart = wpos - glen - 64;\n\t\t\t\t\tif (gstart < 0) {\n\t\t\t\t\t\tgstart = gstart + blen;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tgpan = 0;\n\t\t\tif (p_stereo < 0.5) {\n\t\t\t\tgpan = (clamp(ex, 0, 1) * 2 - 1) * 0.7;\n\t\t\t}\n\t\t\tgth = (gpan + 1) * pi * 0.25;\n\t\t\tpoke(vs, 1, best, 0);\n\t\t\tpoke(vs, floor(mstosamps(max(0, edel))), best, 1);\n\t\t\tpoke(vs, 0, best, 2);\n\t\t\tpoke(vs, glen, best, 3);\n\t\t\tpoke(vs, gstart, best, 4);\n\t\t\tpoke(vs, clamp(eamp, 0, 1), best, 5);\n\t\t\tpoke(vs, cos(gth), best, 6);\n\t\t\tpoke(vs, sin(gth), best, 7);\n\t\t\tpoke(vs, 0, best, 8);\n\t\t\tpoke(vs, 0, best, 9);\n\t\t\tpoke(vs, 0, best, 10);\n\t\t\tpoke(vs, 0, best, 11);\n\t\t\tpoke(vs, 0, best, 12);\n\t\t\tpoke(vs, 0, best, 13);\n\t\t\t// wear footprint: an impact dents at least 80 ms of the buffer, even when the audible\n\t\t\t// grain is shorter (0.2.6: 5 ms grains wore only 0.1 % of the loop per read)\n\t\t\tpoke(vs, max(glen, floor(mstosamps(80))), best, 14);\n\t\t\t// display: wear of the columns this voice wears (sum diff^2, sum fresh^2, count, column)\n\t\t\tpoke(vs, 0, best, 15);\n\t\t\tpoke(vs, 0, best, 16);\n\t\t\tpoke(vs, 0, best, 17);\n\t\t\tpoke(vs, -1, best, 18);\n\t\t}\n\t}\n\tlasthead = head;\n}\n\n// ---------------------------------------------------------------- voices\n// erosion per read pass: EROSION^2 * 0.25, DOSE adds up to +150 % (TARGET ALL / WEAR).\n// 0.2.2: 0.2.1 (EROSION^2 * 0.18, level-dependent targets) was inaudible on pads (user test)\ner = p_erosion * 0.01;\ndosek = 0;\nif (p_target != 1) {\n\tdosek = 1.5;\n}\nperread = min(0.9, er * er * 0.25 * (1 + p_dose * dosek));\ntapea = 1 - exp(-2 * pi * 2200 / samplerate);\nwetl = 0;\nwetr = 0;\nnact = 0;\nfor (v = 0; v < maxv; v += 1) {\n\tif (peek(vs, v, 0) > 0.5) {\n\t\tvwait = peek(vs, v, 1);\n\t\tif (vwait > 0) {\n\t\t\tpoke(vs, vwait - 1, v, 1);\n\t\t} else {\n\t\t\tvph = peek(vs, v, 2);\n\t\t\tvlen = peek(vs, v, 3);\n\t\t\twlen = peek(vs, v, 14);\n\t\t\tvidx = peek(vs, v, 4) + vph;\n\t\t\tif (vidx >= blen) {\n\t\t\t\tvidx = vidx - blen;\n\t\t\t}\n\t\t\txl = peek(worn, vidx, 0);\n\t\t\txr = peek(worn, vidx, 1);\n\t\t\t// audible part: Tukey window (25 % cosine flanks) over the grain length\n\t\t\tif (vph < vlen) {\n\t\t\t\ttt = vph / vlen;\n\t\t\t\twin = 1;\n\t\t\t\tif (tt < 0.25) {\n\t\t\t\t\twin = 0.5 - 0.5 * cos(pi * tt * 4);\n\t\t\t\t}\n\t\t\t\tif (tt > 0.75) {\n\t\t\t\t\twin = 0.5 - 0.5 * cos(pi * (1 - tt) * 4);\n\t\t\t\t}\n\t\t\t\tvg = peek(vs, v, 5) * win;\n\t\t\t\tmono = (xl + xr) * 0.5 * vg;\n\t\t\t\twetl = wetl + mono * peek(vs, v, 6);\n\t\t\t\twetr = wetr + mono * peek(vs, v, 7);\n\t\t\t\tnact = nact + 1;\n\t\t\t}\n\t\t\t// wear window: same shape over the (longer) footprint\n\t\t\ttw = vph / wlen;\n\t\t\twinw = 1;\n\t\t\tif (tw < 0.25) {\n\t\t\t\twinw = 0.5 - 0.5 * cos(pi * tw * 4);\n\t\t\t}\n\t\t\tif (tw > 0.75) {\n\t\t\t\twinw = 0.5 - 0.5 * cos(pi * (1 - tw) * 4);\n\t\t\t}\n\t\t\t// palimpsest write-back: move the read samples toward a degraded version\n\t\t\tif (perread > 0) {\n\t\t\t\t// level-relative wear: every type works against the grain's own envelope, so it\n\t\t\t\t// is audible on quiet / dark material too (0.2.1 was level-dependent)\n\t\t\t\tvenv = max(max(abs(xl), abs(xr)), peek(vs, v, 13) * 0.9997);\n\t\t\t\tpoke(vs, venv, v, 13);\n\t\t\t\tve = max(venv, 0.0001);\n\t\t\t\tdl = xl;\n\t\t\t\tdr = xr;\n\t\t\t\tif (p_weartype < 0.5) {\n\t\t\t\t\t// SAT: peak-preserving saturation (gain 1.3 for small signals, peaks kept);\n\t\t\t\t\t// repeated passes drift toward a fuzzy, square-ish tone\n\t\t\t\t\tdl = ve * tanh(1.2 * xl / ve) * 1.2008;\n\t\t\t\t\tdr = ve * tanh(1.2 * xr / ve) * 1.2008;\n\t\t\t\t} else {\n\t\t\t\t\tif (p_weartype < 1.5) {\n\t\t\t\t\t\t// TAPE: generation loss - lowpass ~2.2 kHz, unity-gain soft saturation, hiss -38 dB\n\t\t\t\t\t\tlpl = peek(vs, v, 8) + (xl - peek(vs, v, 8)) * tapea;\n\t\t\t\t\t\tlpr = peek(vs, v, 9) + (xr - peek(vs, v, 9)) * tapea;\n\t\t\t\t\t\tpoke(vs, lpl, v, 8);\n\t\t\t\t\t\tpoke(vs, lpr, v, 9);\n\t\t\t\t\t\tdl = ve * tanh(lpl / ve) + noise() * ve * 0.012;\n\t\t\t\t\t\tdr = ve * tanh(lpr / ve) + noise() * ve * 0.012;\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// BIT: sample-and-hold (/5) + 3-bit quantisation relative to the envelope\n\t\t\t\t\t\thc = peek(vs, v, 12);\n\t\t\t\t\t\tif (hc <= 0) {\n\t\t\t\t\t\t\tpoke(vs, floor(xl / ve * 4 + 0.5) / 4 * ve, v, 10);\n\t\t\t\t\t\t\tpoke(vs, floor(xr / ve * 4 + 0.5) / 4 * ve, v, 11);\n\t\t\t\t\t\t\thc = 5;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tpoke(vs, hc - 1, v, 12);\n\t\t\t\t\t\tdl = peek(vs, v, 10);\n\t\t\t\t\t\tdr = peek(vs, v, 11);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\twk = perread * winw;\n\t\t\t\tnwl = xl + (dl - xl) * wk;\n\t\t\t\tnwr = xr + (dr - xr) * wk;\n\t\t\t\tpoke(worn, nwl, vidx, 0);\n\t\t\t\tpoke(worn, nwr, vidx, 1);\n\t\t\t\t// display: the worn columns update right away (0.2.8), the scan confirms later;\n\t\t\t\t// wear is scaled to the whole column (a voice may cover only part of it)\n\t\t\t\tvcol = floor(vidx * ovn / blen);\n\t\t\t\tif (vcol != peek(vs, v, 18)) {\n\t\t\t\t\tvcn = peek(vs, v, 17);\n\t\t\t\t\tif (vcn > 0) {\n\t\t\t\t\t\tvwear = clamp(sqrt(peek(vs, v, 15) / max(vcn, blen / ovn)) / max(sqrt(peek(vs, v, 16) / vcn), 0.003), 0, 1);\n\t\t\t\t\t\tvci = peek(vs, v, 18) * 4 + 3;\n\t\t\t\t\t\tpoke(ov, max(peek(ov, vci, 0), vwear), vci, 0);\n\t\t\t\t\t}\n\t\t\t\t\tpoke(vs, 0, v, 15);\n\t\t\t\t\tpoke(vs, 0, v, 16);\n\t\t\t\t\tpoke(vs, 0, v, 17);\n\t\t\t\t\tpoke(vs, vcol, v, 18);\n\t\t\t\t}\n\t\t\t\tvfm = (peek(fresh, vidx, 0) + peek(fresh, vidx, 1)) * 0.5;\n\t\t\t\tvdm = (nwl + nwr) * 0.5 - vfm;\n\t\t\t\tpoke(vs, peek(vs, v, 15) + vdm * vdm, v, 15);\n\t\t\t\tpoke(vs, peek(vs, v, 16) + vfm * vfm, v, 16);\n\t\t\t\tpoke(vs, peek(vs, v, 17) + 1, v, 17);\n\t\t\t}\n\t\t\tvph = vph + 1;\n\t\t\tpoke(vs, vph, v, 2);\n\t\t\tif (vph >= wlen) {\n\t\t\t\tpoke(vs, 0, v, 0);\n\t\t\t\t// last worn column of this voice into the display\n\t\t\t\tvcn = peek(vs, v, 17);\n\t\t\t\tif (vcn > 0) {\n\t\t\t\t\tvwear = clamp(sqrt(peek(vs, v, 15) / max(vcn, blen / ovn)) / max(sqrt(peek(vs, v, 16) / vcn), 0.003), 0, 1);\n\t\t\t\t\tvci = peek(vs, v, 18) * 4 + 3;\n\t\t\t\t\tpoke(ov, max(peek(ov, vci, 0), vwear), vci, 0);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\n// ---------------------------------------------------------------- wet bus\n// density normalisation: overlapping grains add up; scale by 1/sqrt(mean active voices),\n// sqrt(2) undoes the -3 dB centre of the constant-power pan\nsload = sload + (max(1, nact) - sload) * 0.0005;\nwnorm = 1.4142 / sqrt(sload);\nwetl = wetl * wnorm;\nwetr = wetr * wnorm;\n// automatic wet level: match the loudness of the input (mean square, ~0.4 s), gain limited\n// (0.2.6: the wet level is measured only while grains sound - sparse short grains are\n// matched as \"each grain as loud as the input\", pauses stay pauses; time-averaging left\n// 5 ms grains 10 dB too quiet),\n// to -12 .. +12 dB and smoothed (~0.3 s). Held only while the input is silent, so a frozen\n// loop keeps its level after the input stops (0.2.2: no longer held during FREEZE itself -\n// TAPE wear made frozen loops 5 dB quieter).\nmsc = 1 - exp(-1 / (0.4 * samplerate));\ndryms = dryms + ((in1 * in1 + in2 * in2) * 0.5 - dryms) * msc;\nif (nact > 0) {\n\twetms = wetms + ((wetl * wetl + wetr * wetr) * 0.5 - wetms) * msc;\n}\nif (dryms > 0.000001 && wetms > 0.0000001) {\n\tagct = clamp(sqrt(dryms / wetms), 0.25, 4);\n\tagc = agc + (agct - agc) * (1 - exp(-1 / (0.3 * samplerate)));\n}\nwetl = wetl * agc;\nwetr = wetr * agc;\n// wet peak limiter, ceiling -2 dBFS, 64-sample lookahead (1.3 ms; the wet path is not\n// time-aligned to the dry signal anyway, so this adds no latency to the device)\nlpk = max(abs(wetl), abs(wetr));\nif (lpk > lenv) {\n\tlenv = lpk;\n} else {\n\tlenv = lenv + (lpk - lenv) * (1 - exp(-1 / (0.08 * samplerate)));\n}\nlgt = min(1, 0.79 / max(lenv, 0.000001));\nif (lgt < lgain) {\n\tlgain = lgain + (lgt - lgain) * 0.06;\n} else {\n\tlgain = lgain + (lgt - lgain) * (1 - exp(-1 / (0.08 * samplerate)));\n}\nwdo = wdi + 1;\nif (wdo >= 64) {\n\twdo = 0;\n}\npoke(wdl, wetl, wdi, 0);\npoke(wdl, wetr, wdi, 1);\nwetl = peek(wdl, wdo, 0) * lgain;\nwetr = peek(wdl, wdo, 1) * lgain;\nwdi = wdo;\n// DC blocker (~10 Hz): repeated asymmetric wear must not leave an offset\ndcol = wetl - dcxl + 0.9987 * dcyl;\ndcxl = wetl;\ndcyl = dcol;\ndcor = wetr - dcxr + 0.9987 * dcyr;\ndcxr = wetr;\ndcyr = dcor;\n\n// ---------------------------------------------------------------- mix, output\nsmix = smix + (clamp(p_mix * 0.01, 0, 1) - smix) * 0.0008;\nsout = sout + (pow(10, clamp(p_out, -24, 12) / 20) - sout) * 0.0008;\ndryg = cos(smix * pi * 0.5);\nwetg = sin(smix * pi * 0.5);\nol = (in1 * dryg + dcol * wetg) * sout;\norr = (in2 * dryg + dcor * wetg) * sout;\n// transparent below -0.9 dBFS, soft knee above (protection, not a sound feature)\nal = abs(ol);\nif (al > 0.9) {\n\tol = sign(ol) * (0.9 + 0.1 * tanh((al - 0.9) * 10));\n}\nar = abs(orr);\nif (ar > 0.9) {\n\torr = sign(orr) * (0.9 + 0.1 * tanh((ar - 0.9) * 10));\n}\nout1 = ol;\nout2 = orr;\n",
         "fontface": 0,
         "fontname": "<Monospaced>",
         "fontsize": 12.0,
         "numinlets": 2,
         "numoutlets": 2,
         "outlettype": [
          "",
          ""
         ]
        }
       },
       {
        "box": {
         "id": "gen-4",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          720,
          35,
          22
         ],
         "text": "out 1",
         "numinlets": 1,
         "numoutlets": 0
        }
       },
       {
        "box": {
         "id": "gen-5",
         "maxclass": "newobj",
         "patching_rect": [
          200,
          720,
          35,
          22
         ],
         "text": "out 2",
         "numinlets": 1,
         "numoutlets": 0
        }
       }
      ],
      "lines": [
       {
        "patchline": {
         "source": [
          "gen-1",
          0
         ],
         "destination": [
          "gen-3",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "gen-2",
          0
         ],
         "destination": [
          "gen-3",
          1
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "gen-3",
          0
         ],
         "destination": [
          "gen-4",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "gen-3",
          1
         ],
         "destination": [
          "gen-5",
          0
         ]
        }
       }
      ]
     }
    }
   },
   {
    "box": {
     "id": "obj-112",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      632,
      150,
      22
     ],
     "text": "buffer~ ---rkev 50 1",
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "float",
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-113",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      632,
      150,
      22
     ],
     "text": "buffer~ ---rkov 100 1",
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "float",
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-114",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      666,
      150,
      22
     ],
     "text": "peek~ ---rkev",
     "numinlets": 3,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   },
   {
    "box": {
     "id": "obj-115",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      666,
      150,
      22
     ],
     "text": "prepend p_erosion",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-116",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      666,
      150,
      22
     ],
     "text": "prepend p_mix",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-117",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      666,
      150,
      22
     ],
     "text": "prepend p_grain",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-118",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      666,
      150,
      22
     ],
     "text": "prepend p_heal",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-119",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      666,
      150,
      22
     ],
     "text": "prepend p_out",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-120",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      700,
      150,
      22
     ],
     "text": "prepend p_freeze",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-121",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      700,
      150,
      22
     ],
     "text": "prepend p_weartype",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-122",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      700,
      150,
      22
     ],
     "text": "prepend p_target",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-123",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      700,
      150,
      22
     ],
     "text": "prepend p_stereo",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-124",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      700,
      150,
      22
     ],
     "text": "route uid open evw gen win ovreq",
     "numinlets": 1,
     "numoutlets": 7,
     "outlettype": [
      "",
      "",
      "",
      "",
      "",
      "",
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-125",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      700,
      150,
      22
     ],
     "text": "s ---rk_win",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-126",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      734,
      150,
      22
     ],
     "text": "prepend uid",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-127",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      734,
      150,
      22
     ],
     "text": "s ---rk_uid",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-128",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      734,
      150,
      22
     ],
     "text": "prepend ovname ---rkov",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-129",
     "maxclass": "message",
     "patching_rect": [
      530,
      734,
      150,
      22
     ],
     "text": "open",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-130",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      734,
      150,
      22
     ],
     "text": "pcontrol",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-131",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      734,
      150,
      22
     ],
     "text": "p LargeView",
     "numinlets": 1,
     "numoutlets": 0,
     "patcher": {
      "fileversion": 1,
      "appversion": {
       "major": 8,
       "minor": 6,
       "revision": 0,
       "architecture": "x64",
       "modernui": 1
      },
      "classnamespace": "box",
      "rect": [
       120.0,
       120.0,
       960.0,
       456.0
      ],
      "openinpresentation": 1,
      "toolbarvisible": 0,
      "enablehscroll": 0,
      "enablevscroll": 0,
      "boxes": [
       {
        "box": {
         "id": "win-1",
         "maxclass": "panel",
         "patching_rect": [
          190,
          20,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          0,
          0,
          960,
          456
         ],
         "numinlets": 1,
         "numoutlets": 0,
         "background": 1,
         "mode": 1,
         "grad1": [
          0.1373,
          0.149,
          0.1804,
          1.0
         ],
         "grad2": [
          0.0392,
          0.0392,
          0.051,
          1.0
         ],
         "angle": 270.0,
         "bgcolor": [
          0.0392,
          0.0392,
          0.051,
          1.0
         ],
         "border": 0,
         "rounded": 0
        }
       },
       {
        "box": {
         "id": "win-2",
         "maxclass": "jsui",
         "patching_rect": [
          360,
          20,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          20,
          0,
          920,
          276
         ],
         "filename": "runklimpsest_ui.js",
         "jsarguments": [
          "large"
         ],
         "numinlets": 1,
         "numoutlets": 1,
         "outlettype": [
          ""
         ],
         "border": 0
        }
       },
       {
        "box": {
         "id": "win-3",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          20,
          150,
          22
         ],
         "text": "r ---rk_draw",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-4",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          20,
          150,
          22
         ],
         "text": "r ---rk_uid",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-5",
         "maxclass": "jsui",
         "patching_rect": [
          870,
          20,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          20,
          282,
          920,
          160
         ],
         "filename": "runklimpsest_ui.js",
         "jsarguments": [
          "controls"
         ],
         "numinlets": 1,
         "numoutlets": 1,
         "outlettype": [
          ""
         ],
         "border": 0
        }
       },
       {
        "box": {
         "id": "win-6",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          54,
          150,
          22
         ],
         "text": "r ---rk_draw",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-7",
         "maxclass": "newobj",
         "patching_rect": [
          190,
          54,
          150,
          22
         ],
         "text": "r ---rk_uid",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-8",
         "maxclass": "newobj",
         "patching_rect": [
          360,
          54,
          150,
          22
         ],
         "text": "route gravity bounce swarm erosion mix grain heal rate recover output freeze sync division weartype target resetdose stereo",
         "numinlets": 1,
         "numoutlets": 18,
         "outlettype": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-9",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          54,
          150,
          22
         ],
         "text": "s ---gravity_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-10",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          54,
          150,
          22
         ],
         "text": "s ---bounce_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-11",
         "maxclass": "newobj",
         "patching_rect": [
          870,
          54,
          150,
          22
         ],
         "text": "s ---swarm_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-12",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          88,
          150,
          22
         ],
         "text": "s ---erosion_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-13",
         "maxclass": "newobj",
         "patching_rect": [
          190,
          88,
          150,
          22
         ],
         "text": "s ---mix_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-14",
         "maxclass": "newobj",
         "patching_rect": [
          360,
          88,
          150,
          22
         ],
         "text": "s ---grain_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-15",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          88,
          150,
          22
         ],
         "text": "s ---heal_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-16",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          88,
          150,
          22
         ],
         "text": "s ---rate_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-17",
         "maxclass": "newobj",
         "patching_rect": [
          870,
          88,
          150,
          22
         ],
         "text": "s ---recover_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-18",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          122,
          150,
          22
         ],
         "text": "s ---output_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-19",
         "maxclass": "newobj",
         "patching_rect": [
          190,
          122,
          150,
          22
         ],
         "text": "s ---freeze_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-20",
         "maxclass": "newobj",
         "patching_rect": [
          360,
          122,
          150,
          22
         ],
         "text": "s ---sync_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-21",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          122,
          150,
          22
         ],
         "text": "s ---division_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-22",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          122,
          150,
          22
         ],
         "text": "s ---weartype_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-23",
         "maxclass": "newobj",
         "patching_rect": [
          870,
          122,
          150,
          22
         ],
         "text": "s ---target_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-24",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          156,
          150,
          22
         ],
         "text": "s ---resetdose_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-25",
         "maxclass": "newobj",
         "patching_rect": [
          190,
          156,
          150,
          22
         ],
         "text": "s ---stereo_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-26",
         "maxclass": "newobj",
         "patching_rect": [
          360,
          156,
          150,
          22
         ],
         "text": "thispatcher",
         "numinlets": 1,
         "numoutlets": 2,
         "outlettype": [
          "",
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-27",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          156,
          150,
          22
         ],
         "text": "r ---rk_open",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-28",
         "maxclass": "message",
         "patching_rect": [
          700,
          156,
          150,
          22
         ],
         "text": "front",
         "numinlets": 2,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-29",
         "maxclass": "newobj",
         "patching_rect": [
          870,
          156,
          150,
          22
         ],
         "text": "loadbang",
         "numinlets": 1,
         "numoutlets": 1,
         "outlettype": [
          "bang"
         ]
        }
       },
       {
        "box": {
         "id": "win-30",
         "maxclass": "message",
         "patching_rect": [
          20,
          190,
          150,
          22
         ],
         "text": "title Runklimpsest - Large View",
         "numinlets": 2,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-31",
         "maxclass": "message",
         "patching_rect": [
          190,
          190,
          150,
          22
         ],
         "text": "window flags nogrow, window flags nozoom, window exec",
         "numinlets": 2,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-32",
         "maxclass": "newobj",
         "patching_rect": [
          360,
          190,
          150,
          22
         ],
         "text": "r ---rk_win",
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-33",
         "maxclass": "inlet",
         "patching_rect": [
          530,
          190,
          150,
          22
         ],
         "numinlets": 0,
         "numoutlets": 1,
         "outlettype": [
          ""
         ],
         "comment": "open"
        }
       }
      ],
      "lines": [
       {
        "patchline": {
         "source": [
          "win-3",
          0
         ],
         "destination": [
          "win-2",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-4",
          0
         ],
         "destination": [
          "win-2",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-6",
          0
         ],
         "destination": [
          "win-5",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-7",
          0
         ],
         "destination": [
          "win-5",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-5",
          0
         ],
         "destination": [
          "win-8",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          0
         ],
         "destination": [
          "win-9",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          1
         ],
         "destination": [
          "win-10",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          2
         ],
         "destination": [
          "win-11",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          3
         ],
         "destination": [
          "win-12",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          4
         ],
         "destination": [
          "win-13",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          5
         ],
         "destination": [
          "win-14",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          6
         ],
         "destination": [
          "win-15",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          7
         ],
         "destination": [
          "win-16",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          8
         ],
         "destination": [
          "win-17",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          9
         ],
         "destination": [
          "win-18",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          10
         ],
         "destination": [
          "win-19",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          11
         ],
         "destination": [
          "win-20",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          12
         ],
         "destination": [
          "win-21",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          13
         ],
         "destination": [
          "win-22",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          14
         ],
         "destination": [
          "win-23",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          15
         ],
         "destination": [
          "win-24",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-8",
          16
         ],
         "destination": [
          "win-25",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-27",
          0
         ],
         "destination": [
          "win-28",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-28",
          0
         ],
         "destination": [
          "win-26",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-29",
          0
         ],
         "destination": [
          "win-30",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-30",
          0
         ],
         "destination": [
          "win-26",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-29",
          0
         ],
         "destination": [
          "win-31",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-31",
          0
         ],
         "destination": [
          "win-26",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-32",
          0
         ],
         "destination": [
          "win-26",
          0
         ]
        }
       }
      ]
     }
    }
   },
   {
    "box": {
     "id": "obj-132",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      768,
      150,
      22
     ],
     "text": "t b b b",
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "bang",
      "bang",
      "bang"
     ]
    }
   },
   {
    "box": {
     "id": "obj-133",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      768,
      150,
      22
     ],
     "text": "mousestate",
     "numinlets": 1,
     "numoutlets": 5,
     "outlettype": [
      "int",
      "int",
      "int",
      "int",
      "int"
     ]
    }
   },
   {
    "box": {
     "id": "obj-134",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      768,
      150,
      22
     ],
     "text": "pack 0 0",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-135",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      768,
      150,
      22
     ],
     "text": "prepend winpos",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-136",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      768,
      150,
      22
     ],
     "text": "s ---rk_open",
     "numinlets": 1,
     "numoutlets": 0,
     "outlettype": []
    }
   },
   {
    "box": {
     "id": "obj-137",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      768,
      150,
      22
     ],
     "text": "plugin~",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "signal",
      "signal"
     ]
    }
   },
   {
    "box": {
     "id": "obj-138",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      802,
      150,
      22
     ],
     "text": "plugout~",
     "numinlets": 2,
     "numoutlets": 2,
     "outlettype": [
      "signal",
      "signal"
     ]
    }
   },
   {
    "box": {
     "id": "obj-139",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      802,
      150,
      22
     ],
     "text": "+~",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "signal"
     ]
    }
   },
   {
    "box": {
     "id": "obj-140",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      802,
      150,
      22
     ],
     "text": "peakamp~ 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   },
   {
    "box": {
     "id": "obj-141",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      802,
      150,
      22
     ],
     "text": "prepend level",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-142",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      802,
      150,
      22
     ],
     "text": "pak f f f f",
     "numinlets": 4,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-143",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      802,
      150,
      22
     ],
     "text": "prepend meters",
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      ""
     ]
    }
   },
   {
    "box": {
     "id": "obj-144",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      836,
      150,
      22
     ],
     "text": "peakamp~ 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   },
   {
    "box": {
     "id": "obj-145",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      836,
      150,
      22
     ],
     "text": "peakamp~ 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   },
   {
    "box": {
     "id": "obj-146",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      836,
      150,
      22
     ],
     "text": "peakamp~ 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   },
   {
    "box": {
     "id": "obj-147",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      836,
      150,
      22
     ],
     "text": "peakamp~ 33",
     "numinlets": 2,
     "numoutlets": 1,
     "outlettype": [
      "float"
     ]
    }
   }
  ],
  "lines": [
   {
    "patchline": {
     "source": [
      "obj-19",
      0
     ],
     "destination": [
      "obj-20",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      1
     ],
     "destination": [
      "obj-21",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      2
     ],
     "destination": [
      "obj-22",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      3
     ],
     "destination": [
      "obj-23",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      4
     ],
     "destination": [
      "obj-24",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      5
     ],
     "destination": [
      "obj-25",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      6
     ],
     "destination": [
      "obj-26",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      7
     ],
     "destination": [
      "obj-27",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      8
     ],
     "destination": [
      "obj-28",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      9
     ],
     "destination": [
      "obj-29",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      10
     ],
     "destination": [
      "obj-30",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      11
     ],
     "destination": [
      "obj-31",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      12
     ],
     "destination": [
      "obj-32",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      13
     ],
     "destination": [
      "obj-33",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      14
     ],
     "destination": [
      "obj-34",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      15
     ],
     "destination": [
      "obj-35",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-19",
      16
     ],
     "destination": [
      "obj-36",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-37",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-2",
      0
     ],
     "destination": [
      "obj-39",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-39",
      0
     ],
     "destination": [
      "obj-40",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-41",
      0
     ],
     "destination": [
      "obj-2",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-2",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-3",
      0
     ],
     "destination": [
      "obj-42",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-42",
      0
     ],
     "destination": [
      "obj-43",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-44",
      0
     ],
     "destination": [
      "obj-3",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-3",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-4",
      0
     ],
     "destination": [
      "obj-45",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-45",
      0
     ],
     "destination": [
      "obj-46",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-47",
      0
     ],
     "destination": [
      "obj-4",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-4",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-5",
      0
     ],
     "destination": [
      "obj-48",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-48",
      0
     ],
     "destination": [
      "obj-49",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-50",
      0
     ],
     "destination": [
      "obj-5",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-5",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-6",
      0
     ],
     "destination": [
      "obj-51",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-51",
      0
     ],
     "destination": [
      "obj-52",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-53",
      0
     ],
     "destination": [
      "obj-6",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-6",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-7",
      0
     ],
     "destination": [
      "obj-54",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-54",
      0
     ],
     "destination": [
      "obj-55",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-56",
      0
     ],
     "destination": [
      "obj-7",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-7",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-8",
      0
     ],
     "destination": [
      "obj-57",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-57",
      0
     ],
     "destination": [
      "obj-58",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-59",
      0
     ],
     "destination": [
      "obj-8",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-8",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-9",
      0
     ],
     "destination": [
      "obj-60",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-60",
      0
     ],
     "destination": [
      "obj-61",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-62",
      0
     ],
     "destination": [
      "obj-9",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-9",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-10",
      0
     ],
     "destination": [
      "obj-63",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-63",
      0
     ],
     "destination": [
      "obj-64",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-65",
      0
     ],
     "destination": [
      "obj-10",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-10",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-11",
      0
     ],
     "destination": [
      "obj-66",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-66",
      0
     ],
     "destination": [
      "obj-67",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-68",
      0
     ],
     "destination": [
      "obj-11",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-11",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-12",
      0
     ],
     "destination": [
      "obj-69",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-69",
      0
     ],
     "destination": [
      "obj-70",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-71",
      0
     ],
     "destination": [
      "obj-12",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-12",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-13",
      0
     ],
     "destination": [
      "obj-72",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-72",
      0
     ],
     "destination": [
      "obj-73",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-74",
      0
     ],
     "destination": [
      "obj-13",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-13",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-14",
      0
     ],
     "destination": [
      "obj-75",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-75",
      0
     ],
     "destination": [
      "obj-76",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-77",
      0
     ],
     "destination": [
      "obj-14",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-14",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-15",
      0
     ],
     "destination": [
      "obj-78",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-78",
      0
     ],
     "destination": [
      "obj-79",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-80",
      0
     ],
     "destination": [
      "obj-15",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-15",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-16",
      0
     ],
     "destination": [
      "obj-81",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-81",
      0
     ],
     "destination": [
      "obj-82",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-83",
      0
     ],
     "destination": [
      "obj-16",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-16",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-17",
      0
     ],
     "destination": [
      "obj-84",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-84",
      0
     ],
     "destination": [
      "obj-85",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-86",
      0
     ],
     "destination": [
      "obj-17",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-18",
      0
     ],
     "destination": [
      "obj-87",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-87",
      0
     ],
     "destination": [
      "obj-88",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-89",
      0
     ],
     "destination": [
      "obj-18",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-38",
      0
     ],
     "destination": [
      "obj-18",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-90",
      0
     ],
     "destination": [
      "obj-91",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-91",
      2
     ],
     "destination": [
      "obj-92",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-91",
      0
     ],
     "destination": [
      "obj-93",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-91",
      0
     ],
     "destination": [
      "obj-96",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-93",
      0
     ],
     "destination": [
      "obj-94",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-94",
      1
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-94",
      0
     ],
     "destination": [
      "obj-95",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-96",
      0
     ],
     "destination": [
      "obj-97",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-97",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-91",
      1
     ],
     "destination": [
      "obj-98",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-98",
      0
     ],
     "destination": [
      "obj-99",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-99",
      0
     ],
     "destination": [
      "obj-100",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-100",
      0
     ],
     "destination": [
      "obj-101",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-101",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-99",
      0
     ],
     "destination": [
      "obj-102",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-102",
      0
     ],
     "destination": [
      "obj-103",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-103",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-99",
      0
     ],
     "destination": [
      "obj-104",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-104",
      0
     ],
     "destination": [
      "obj-105",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-105",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-14",
      0
     ],
     "destination": [
      "obj-106",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-106",
      0
     ],
     "destination": [
      "obj-107",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-107",
      0
     ],
     "destination": [
      "obj-96",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-106",
      1
     ],
     "destination": [
      "obj-108",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-108",
      0
     ],
     "destination": [
      "obj-96",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-106",
      2
     ],
     "destination": [
      "obj-109",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-109",
      0
     ],
     "destination": [
      "obj-96",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-106",
      3
     ],
     "destination": [
      "obj-110",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-110",
      0
     ],
     "destination": [
      "obj-96",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-5",
      0
     ],
     "destination": [
      "obj-115",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-115",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-6",
      0
     ],
     "destination": [
      "obj-116",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-116",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-7",
      0
     ],
     "destination": [
      "obj-117",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-117",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-8",
      0
     ],
     "destination": [
      "obj-118",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-118",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-11",
      0
     ],
     "destination": [
      "obj-119",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-119",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-12",
      0
     ],
     "destination": [
      "obj-120",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-120",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-15",
      0
     ],
     "destination": [
      "obj-121",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-121",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-16",
      0
     ],
     "destination": [
      "obj-122",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-122",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-18",
      0
     ],
     "destination": [
      "obj-123",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-123",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      2
     ],
     "destination": [
      "obj-114",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      3
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-1",
      0
     ],
     "destination": [
      "obj-124",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      0
     ],
     "destination": [
      "obj-126",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-126",
      0
     ],
     "destination": [
      "obj-127",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      4
     ],
     "destination": [
      "obj-125",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      6
     ],
     "destination": [
      "obj-19",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      5
     ],
     "destination": [
      "obj-128",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-128",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-133",
      1
     ],
     "destination": [
      "obj-134",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-133",
      2
     ],
     "destination": [
      "obj-134",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-134",
      0
     ],
     "destination": [
      "obj-135",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-135",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-124",
      1
     ],
     "destination": [
      "obj-132",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-132",
      2
     ],
     "destination": [
      "obj-129",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-132",
      1
     ],
     "destination": [
      "obj-133",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-132",
      0
     ],
     "destination": [
      "obj-136",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-129",
      0
     ],
     "destination": [
      "obj-130",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-130",
      0
     ],
     "destination": [
      "obj-131",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      0
     ],
     "destination": [
      "obj-111",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      1
     ],
     "destination": [
      "obj-111",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-111",
      0
     ],
     "destination": [
      "obj-138",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-111",
      1
     ],
     "destination": [
      "obj-138",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      0
     ],
     "destination": [
      "obj-139",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      1
     ],
     "destination": [
      "obj-139",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-139",
      0
     ],
     "destination": [
      "obj-140",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-140",
      0
     ],
     "destination": [
      "obj-141",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-141",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      0
     ],
     "destination": [
      "obj-144",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-144",
      0
     ],
     "destination": [
      "obj-142",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-137",
      1
     ],
     "destination": [
      "obj-145",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-145",
      0
     ],
     "destination": [
      "obj-142",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-111",
      0
     ],
     "destination": [
      "obj-146",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-146",
      0
     ],
     "destination": [
      "obj-142",
      2
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-111",
      1
     ],
     "destination": [
      "obj-147",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-147",
      0
     ],
     "destination": [
      "obj-142",
      3
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-142",
      0
     ],
     "destination": [
      "obj-143",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-143",
      0
     ],
     "destination": [
      "obj-1",
      0
     ]
    }
   }
  ],
  "parameters": {
   "obj-2": [
    "Gravity",
    "GRAVITY",
    0
   ],
   "obj-3": [
    "Bounce",
    "BOUNCE",
    0
   ],
   "obj-4": [
    "Swarm",
    "SWARM",
    0
   ],
   "obj-5": [
    "Erosion",
    "EROSION",
    0
   ],
   "obj-6": [
    "Mix",
    "MIX",
    0
   ],
   "obj-7": [
    "Grain",
    "GRAIN",
    0
   ],
   "obj-8": [
    "Heal",
    "HEAL",
    0
   ],
   "obj-9": [
    "Dose Rate",
    "RATE",
    0
   ],
   "obj-10": [
    "Dose Recover",
    "RECOVER",
    0
   ],
   "obj-11": [
    "Output",
    "OUTPUT",
    0
   ],
   "obj-12": [
    "Freeze",
    "FREEZE",
    0
   ],
   "obj-13": [
    "Sync",
    "SYNC",
    0
   ],
   "obj-14": [
    "Division",
    "DIVISION",
    0
   ],
   "obj-15": [
    "Wear Type",
    "WEAR TYPE",
    0
   ],
   "obj-16": [
    "Dose Target",
    "DOSE TARGET",
    0
   ],
   "obj-17": [
    "Dose Reset",
    "DOSE RESET",
    0
   ],
   "obj-18": [
    "Stereo",
    "STEREO",
    0
   ],
   "inherited_shortname": 1,
   "parameterbanks": {
    "0": {
     "index": 0,
     "name": "Main",
     "parameters": [
      "Gravity",
      "Bounce",
      "Swarm",
      "Erosion",
      "Mix",
      "Freeze",
      "Sync",
      "Division"
     ]
    },
    "1": {
     "index": 1,
     "name": "Detail",
     "parameters": [
      "Grain",
      "Heal",
      "Dose Rate",
      "Dose Recover",
      "Output",
      "Wear Type",
      "Dose Target",
      "Stereo"
     ]
    },
    "2": {
     "index": 2,
     "name": "Reset",
     "parameters": [
      "Dose Reset"
     ]
    }
   }
  },
  "dependency_cache": [
   {
    "name": "runklimpsest_ui.js",
    "bootpath": ".",
    "type": "TEXT",
    "implicit": 1
   }
  ],
  "latency": 0,
  "is_mpe": 0,
  "oscreceiveudpport": 0,
  "minimum_live_version": "",
  "minimum_max_version": "",
  "platform_compatibility": 0,
  "autosave": 0
 }
}
