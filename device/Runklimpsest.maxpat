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
      580,
      169
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
     "id": "obj-2",
     "maxclass": "jsui",
     "patching_rect": [
      360,
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
     "id": "obj-3",
     "maxclass": "live.dial",
     "patching_rect": [
      530,
      20,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      376,
      18,
      54,
      70
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "gravity",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Gravity",
       "parameter_shortname": "GRAVITY",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0.62
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
     "id": "obj-4",
     "maxclass": "live.dial",
     "patching_rect": [
      700,
      20,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      430,
      18,
      54,
      70
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "bounce",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Bounce",
       "parameter_shortname": "BOUNCE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        80.0
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
     "id": "obj-5",
     "maxclass": "live.dial",
     "patching_rect": [
      870,
      20,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      484,
      18,
      54,
      70
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "swarm",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Swarm",
       "parameter_shortname": "SWARM",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        12
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
     "id": "obj-6",
     "maxclass": "live.dial",
     "patching_rect": [
      20,
      54,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      306,
      92,
      60,
      70
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "erosion",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Erosion",
       "parameter_shortname": "EROSION",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        55.0
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
     "maxclass": "live.dial",
     "patching_rect": [
      190,
      54,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      430,
      92,
      54,
      70
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      "float"
     ],
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "mix",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Mix",
       "parameter_shortname": "MIX",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        100.0
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
     "id": "obj-8",
     "maxclass": "live.dial",
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
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "grain",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Grain",
       "parameter_shortname": "GRAIN",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        80.0
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
     "id": "obj-9",
     "maxclass": "live.dial",
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
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "heal",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Heal",
       "parameter_shortname": "HEAL",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        8.0
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
     "id": "obj-10",
     "maxclass": "live.dial",
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
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "rate",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Rate",
       "parameter_shortname": "RATE",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        4.0
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
     "id": "obj-11",
     "maxclass": "live.dial",
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
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
     "varname": "recover",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Recover",
       "parameter_shortname": "RECOVER",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        12.0
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
     "id": "obj-12",
     "maxclass": "live.dial",
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
     "activedialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "dialcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activeneedlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "needlecolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "showname": 0,
     "shownumber": 0,
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
     "id": "obj-13",
     "maxclass": "live.text",
     "patching_rect": [
      190,
      88,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      214,
      92,
      76,
      22
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ],
     "mode": 1,
     "text": "FREEZE",
     "texton": "FREEZE",
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
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
     "id": "obj-14",
     "maxclass": "live.text",
     "patching_rect": [
      360,
      88,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      118,
      3,
      42,
      13
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ],
     "mode": 1,
     "text": "SYNC",
     "texton": "SYNC",
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
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
     "id": "obj-15",
     "maxclass": "live.menu",
     "patching_rect": [
      530,
      88,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      163,
      3,
      43,
      13
     ],
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "",
      "",
      "float"
     ],
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "tricolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
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
     "id": "obj-16",
     "maxclass": "live.tab",
     "patching_rect": [
      700,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "",
      "",
      "float"
     ],
     "num_lines_patching": 1,
     "num_lines_presentation": 1,
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
     "id": "obj-17",
     "maxclass": "live.tab",
     "patching_rect": [
      870,
      88,
      150,
      22
     ],
     "numinlets": 1,
     "numoutlets": 3,
     "outlettype": [
      "",
      "",
      "float"
     ],
     "num_lines_patching": 1,
     "num_lines_presentation": 1,
     "varname": "target",
     "parameter_enable": 1,
     "saved_attribute_attributes": {
      "valueof": {
       "parameter_longname": "Dose Target",
       "parameter_shortname": "DOSE TARGET",
       "parameter_initial_enable": 1,
       "parameter_initial": [
        0
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
     "id": "obj-18",
     "maxclass": "live.text",
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
      ""
     ],
     "mode": 0,
     "text": "RESET DOSE",
     "texton": "RESET DOSE",
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextoncolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
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
     "id": "obj-19",
     "maxclass": "live.text",
     "patching_rect": [
      190,
      122,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      488,
      124,
      46,
      18
     ],
     "numinlets": 1,
     "numoutlets": 2,
     "outlettype": [
      "",
      ""
     ],
     "mode": 0,
     "text": "MORE",
     "texton": "MORE",
     "parameter_enable": 0,
     "varname": "btn_more",
     "bgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activebgcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "textcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "activetextcolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "bordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
     ],
     "focusbordercolor": [
      0.0,
      0.0,
      0.0,
      0.0
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
     "id": "obj-21",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      122,
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
     "id": "obj-22",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      122,
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
     "id": "obj-23",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      122,
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
     "id": "obj-24",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      156,
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
     "id": "obj-25",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      156,
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
     "id": "obj-26",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      156,
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
     "id": "obj-27",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      156,
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
     "id": "obj-28",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      156,
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
     "id": "obj-29",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      156,
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
     "id": "obj-30",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      190,
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
     "id": "obj-31",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      190,
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
     "id": "obj-32",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      190,
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
     "id": "obj-33",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      190,
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
     "id": "obj-34",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      190,
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
     "id": "obj-35",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      190,
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
     "id": "obj-36",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      224,
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
     "id": "obj-37",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      224,
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
     "id": "obj-38",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-39",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      224,
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
     "id": "obj-40",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      224,
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
     "id": "obj-41",
     "maxclass": "newobj",
     "patching_rect": [
      870,
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
     "id": "obj-42",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      258,
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
     "id": "obj-43",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      258,
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
     "id": "obj-44",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-45",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      258,
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
     "id": "obj-46",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      258,
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
     "id": "obj-47",
     "maxclass": "newobj",
     "patching_rect": [
      870,
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
     "id": "obj-48",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      292,
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
     "id": "obj-49",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      292,
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
     "id": "obj-50",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-51",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      292,
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
     "id": "obj-52",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      292,
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
     "id": "obj-53",
     "maxclass": "newobj",
     "patching_rect": [
      870,
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
     "id": "obj-54",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      326,
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
     "id": "obj-55",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      326,
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
     "id": "obj-56",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-57",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      326,
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
     "id": "obj-58",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      326,
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
     "id": "obj-59",
     "maxclass": "newobj",
     "patching_rect": [
      870,
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
     "id": "obj-60",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      360,
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
     "id": "obj-61",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      360,
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
     "id": "obj-62",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-63",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      360,
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
     "id": "obj-64",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      360,
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
     "id": "obj-65",
     "maxclass": "newobj",
     "patching_rect": [
      870,
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
     "id": "obj-66",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      394,
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
     "id": "obj-67",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      394,
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
     "id": "obj-68",
     "maxclass": "newobj",
     "patching_rect": [
      360,
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
     "id": "obj-69",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      394,
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
     "id": "obj-70",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      394,
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
     "id": "obj-71",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      394,
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
     "id": "obj-72",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      428,
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
     "id": "obj-73",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      428,
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
     "id": "obj-74",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      428,
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
     "id": "obj-75",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      428,
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
     "id": "obj-76",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      428,
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
     "id": "obj-77",
     "maxclass": "message",
     "patching_rect": [
      870,
      428,
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
     "id": "obj-78",
     "maxclass": "message",
     "patching_rect": [
      20,
      462,
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
     "id": "obj-79",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      462,
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
     "id": "obj-80",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      462,
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
     "id": "obj-81",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      462,
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
     "id": "obj-82",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      462,
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
     "id": "obj-83",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      462,
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
     "id": "obj-84",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      496,
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
     "id": "obj-85",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      496,
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
     "id": "obj-86",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      496,
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
     "id": "obj-87",
     "maxclass": "message",
     "patching_rect": [
      530,
      496,
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
     "id": "obj-88",
     "maxclass": "message",
     "patching_rect": [
      700,
      496,
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
     "id": "obj-89",
     "maxclass": "message",
     "patching_rect": [
      870,
      496,
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
     "id": "obj-90",
     "maxclass": "message",
     "patching_rect": [
      20,
      530,
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
     "id": "obj-91",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      530,
      150,
      22
     ],
     "text": "route uid open",
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
     "id": "obj-92",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      530,
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
     "id": "obj-93",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      530,
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
     "id": "obj-94",
     "maxclass": "message",
     "patching_rect": [
      700,
      530,
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
     "id": "obj-95",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      530,
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
     "id": "obj-96",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      564,
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
       620.0
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
          620
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
          16,
          10,
          230,
          22
         ],
         "filename": "runklimpsest_ui.js",
         "jsarguments": [
          "title"
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
         "maxclass": "comment",
         "patching_rect": [
          530,
          20,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          252,
          14,
          100,
          14
         ],
         "text": "LARGE VIEW",
         "numinlets": 1,
         "numoutlets": 0,
         "textcolor": [
          0.5412,
          0.5647,
          0.6118,
          1.0
         ],
         "fontsize": 9,
         "fontname": "Ableton Sans Bold",
         "textjustification": 0
        }
       },
       {
        "box": {
         "id": "win-4",
         "maxclass": "jsui",
         "patching_rect": [
          700,
          20,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          16,
          40,
          928,
          396
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
         "id": "win-5",
         "maxclass": "newobj",
         "patching_rect": [
          870,
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
         "id": "win-6",
         "maxclass": "newobj",
         "patching_rect": [
          20,
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
         "id": "win-7",
         "maxclass": "jsui",
         "patching_rect": [
          190,
          54,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          16,
          444,
          928,
          170
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
         "id": "win-8",
         "maxclass": "newobj",
         "patching_rect": [
          360,
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
         "id": "win-9",
         "maxclass": "newobj",
         "patching_rect": [
          530,
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
         "id": "win-10",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          54,
          150,
          22
         ],
         "text": "route gravity bounce swarm erosion mix grain heal rate recover output freeze sync division weartype target resetdose",
         "numinlets": 1,
         "numoutlets": 17,
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
          ""
         ]
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
         "text": "s ---gravity_c",
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
         "text": "s ---bounce_c",
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
         "text": "s ---swarm_c",
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
         "text": "s ---erosion_c",
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
         "text": "s ---mix_c",
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
         "text": "s ---grain_c",
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
         "text": "s ---heal_c",
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
         "text": "s ---rate_c",
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
         "text": "s ---recover_c",
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
         "text": "s ---output_c",
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
         "text": "s ---freeze_c",
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
         "text": "s ---sync_c",
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
         "text": "s ---division_c",
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
         "text": "s ---weartype_c",
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
         "text": "s ---target_c",
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
         "text": "s ---resetdose_c",
         "numinlets": 1,
         "numoutlets": 0,
         "outlettype": []
        }
       },
       {
        "box": {
         "id": "win-27",
         "maxclass": "live.text",
         "patching_rect": [
          530,
          156,
          150,
          22
         ],
         "presentation": 1,
         "presentation_rect": [
          868,
          12,
          76,
          20
         ],
         "numinlets": 1,
         "numoutlets": 2,
         "outlettype": [
          "",
          ""
         ],
         "mode": 0,
         "text": "CLOSE",
         "texton": "CLOSE",
         "parameter_enable": 0,
         "varname": "btn_close",
         "bgcolor": [
          0.1373,
          0.149,
          0.1804,
          1.0
         ],
         "activebgcolor": [
          0.1373,
          0.149,
          0.1804,
          1.0
         ],
         "textcolor": [
          0.9529,
          0.9608,
          0.9725,
          1.0
         ],
         "activetextcolor": [
          0.9529,
          0.9608,
          0.9725,
          1.0
         ],
         "bordercolor": [
          1.0,
          1.0,
          1.0,
          0.12
         ],
         "fontsize": 8.0,
         "fontname": "Ableton Sans Bold",
         "rounded": 4.0
        }
       },
       {
        "box": {
         "id": "win-28",
         "maxclass": "newobj",
         "patching_rect": [
          700,
          156,
          150,
          22
         ],
         "text": "t b",
         "numinlets": 1,
         "numoutlets": 1,
         "outlettype": [
          "bang"
         ]
        }
       },
       {
        "box": {
         "id": "win-29",
         "maxclass": "message",
         "patching_rect": [
          870,
          156,
          150,
          22
         ],
         "text": "wclose",
         "numinlets": 2,
         "numoutlets": 1,
         "outlettype": [
          ""
         ]
        }
       },
       {
        "box": {
         "id": "win-30",
         "maxclass": "newobj",
         "patching_rect": [
          20,
          190,
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
         "id": "win-31",
         "maxclass": "newobj",
         "patching_rect": [
          190,
          190,
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
         "id": "win-32",
         "maxclass": "message",
         "patching_rect": [
          360,
          190,
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
         "id": "win-33",
         "maxclass": "newobj",
         "patching_rect": [
          530,
          190,
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
         "id": "win-34",
         "maxclass": "message",
         "patching_rect": [
          700,
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
         "id": "win-35",
         "maxclass": "inlet",
         "patching_rect": [
          870,
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
          "win-5",
          0
         ],
         "destination": [
          "win-4",
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
          "win-4",
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
          "win-7",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-9",
          0
         ],
         "destination": [
          "win-7",
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
          "win-10",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-10",
          0
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
          "win-10",
          1
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
          "win-10",
          2
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
          "win-10",
          3
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
          "win-10",
          4
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
          "win-10",
          5
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
          "win-10",
          6
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
          "win-10",
          7
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
          "win-10",
          8
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
          "win-10",
          9
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
          "win-10",
          10
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
          "win-10",
          11
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
          "win-10",
          12
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
          "win-10",
          13
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
          "win-10",
          14
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
          "win-10",
          15
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
          "win-29",
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
          "win-31",
          0
         ],
         "destination": [
          "win-32",
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
          "win-30",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-33",
          0
         ],
         "destination": [
          "win-34",
          0
         ]
        }
       },
       {
        "patchline": {
         "source": [
          "win-34",
          0
         ],
         "destination": [
          "win-30",
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
     "id": "obj-97",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      564,
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
     "id": "obj-98",
     "maxclass": "newobj",
     "patching_rect": [
      360,
      564,
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
     "id": "obj-99",
     "maxclass": "newobj",
     "patching_rect": [
      530,
      564,
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
     "id": "obj-100",
     "maxclass": "newobj",
     "patching_rect": [
      700,
      564,
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
     "id": "obj-101",
     "maxclass": "newobj",
     "patching_rect": [
      870,
      564,
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
     "id": "obj-102",
     "maxclass": "newobj",
     "patching_rect": [
      20,
      598,
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
     "id": "obj-103",
     "maxclass": "newobj",
     "patching_rect": [
      190,
      598,
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
     "id": "obj-104",
     "maxclass": "live.meter~",
     "patching_rect": [
      360,
      598,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      547,
      18,
      5,
      128
     ],
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      "list"
     ],
     "coldcolor": [
      0.2314,
      0.8784,
      0.5608,
      1.0
     ],
     "warmcolor": [
      1.0,
      0.8471,
      0.2902,
      1.0
     ],
     "hotcolor": [
      1.0,
      0.5412,
      0.1647,
      1.0
     ],
     "overloadcolor": [
      1.0,
      0.3529,
      0.2392,
      1.0
     ],
     "bgcolor": [
      0.1137,
      0.1255,
      0.1529,
      1.0
     ],
     "interval": 33
    }
   },
   {
    "box": {
     "id": "obj-105",
     "maxclass": "live.meter~",
     "patching_rect": [
      530,
      598,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      553,
      18,
      5,
      128
     ],
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      "list"
     ],
     "coldcolor": [
      0.2314,
      0.8784,
      0.5608,
      1.0
     ],
     "warmcolor": [
      1.0,
      0.8471,
      0.2902,
      1.0
     ],
     "hotcolor": [
      1.0,
      0.5412,
      0.1647,
      1.0
     ],
     "overloadcolor": [
      1.0,
      0.3529,
      0.2392,
      1.0
     ],
     "bgcolor": [
      0.1137,
      0.1255,
      0.1529,
      1.0
     ],
     "interval": 33
    }
   },
   {
    "box": {
     "id": "obj-106",
     "maxclass": "live.meter~",
     "patching_rect": [
      700,
      598,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      562,
      18,
      5,
      128
     ],
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      "list"
     ],
     "coldcolor": [
      0.2314,
      0.8784,
      0.5608,
      1.0
     ],
     "warmcolor": [
      1.0,
      0.8471,
      0.2902,
      1.0
     ],
     "hotcolor": [
      1.0,
      0.5412,
      0.1647,
      1.0
     ],
     "overloadcolor": [
      1.0,
      0.3529,
      0.2392,
      1.0
     ],
     "bgcolor": [
      0.1137,
      0.1255,
      0.1529,
      1.0
     ],
     "interval": 33
    }
   },
   {
    "box": {
     "id": "obj-107",
     "maxclass": "live.meter~",
     "patching_rect": [
      870,
      598,
      150,
      22
     ],
     "presentation": 1,
     "presentation_rect": [
      568,
      18,
      5,
      128
     ],
     "numinlets": 1,
     "numoutlets": 1,
     "outlettype": [
      "list"
     ],
     "coldcolor": [
      0.2314,
      0.8784,
      0.5608,
      1.0
     ],
     "warmcolor": [
      1.0,
      0.8471,
      0.2902,
      1.0
     ],
     "hotcolor": [
      1.0,
      0.5412,
      0.1647,
      1.0
     ],
     "overloadcolor": [
      1.0,
      0.3529,
      0.2392,
      1.0
     ],
     "bgcolor": [
      0.1137,
      0.1255,
      0.1529,
      1.0
     ],
     "interval": 33
    }
   }
  ],
  "lines": [
   {
    "patchline": {
     "source": [
      "obj-20",
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
      "obj-22",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-22",
      0
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
      "obj-24",
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
      "obj-21",
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
      "obj-25",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-25",
      0
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
      "obj-27",
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
      "obj-21",
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
      "obj-28",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-28",
      0
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
      "obj-30",
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
      "obj-21",
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
      "obj-31",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-31",
      0
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
      "obj-33",
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
      "obj-21",
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
      "obj-34",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-34",
      0
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
      "obj-36",
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
      "obj-21",
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
      "obj-37",
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
      "obj-38",
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
      "obj-8",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-40",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-40",
      0
     ],
     "destination": [
      "obj-41",
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
      "obj-9",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-43",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-43",
      0
     ],
     "destination": [
      "obj-44",
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
      "obj-10",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-46",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-46",
      0
     ],
     "destination": [
      "obj-47",
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
      "obj-11",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-49",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-49",
      0
     ],
     "destination": [
      "obj-50",
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
      "obj-12",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-52",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-52",
      0
     ],
     "destination": [
      "obj-53",
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
      "obj-13",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-55",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-55",
      0
     ],
     "destination": [
      "obj-56",
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
      "obj-14",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-58",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-58",
      0
     ],
     "destination": [
      "obj-59",
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
      "obj-15",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-61",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-61",
      0
     ],
     "destination": [
      "obj-62",
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
      "obj-16",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-64",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-64",
      0
     ],
     "destination": [
      "obj-65",
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
      "obj-17",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-21",
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
      "obj-67",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-67",
      0
     ],
     "destination": [
      "obj-68",
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
      "obj-18",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-70",
      0
     ],
     "destination": [
      "obj-71",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-71",
      2
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
      "obj-71",
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
      "obj-71",
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
      "obj-73",
      0
     ],
     "destination": [
      "obj-74",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-74",
      1
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
      "obj-74",
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
      "obj-76",
      0
     ],
     "destination": [
      "obj-77",
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
      "obj-2",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-71",
      1
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
      "obj-79",
      0
     ],
     "destination": [
      "obj-80",
      1
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
      "obj-2",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-79",
      0
     ],
     "destination": [
      "obj-82",
      1
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-82",
      0
     ],
     "destination": [
      "obj-83",
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
      "obj-2",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-79",
      0
     ],
     "destination": [
      "obj-84",
      1
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
      "obj-85",
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
      "obj-15",
      0
     ],
     "destination": [
      "obj-86",
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
      "obj-76",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-86",
      1
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
      "obj-88",
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
      "obj-86",
      2
     ],
     "destination": [
      "obj-89",
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
      "obj-76",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-86",
      3
     ],
     "destination": [
      "obj-90",
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
      "obj-76",
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
      "obj-91",
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
      "obj-92",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-92",
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
      "obj-19",
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
      "obj-91",
      1
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
      1
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
      "obj-97",
      0
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
      "obj-95",
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
      "obj-99",
      0
     ],
     "destination": [
      "obj-100",
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-99",
      1
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
      "obj-99",
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
      "obj-99",
      1
     ],
     "destination": [
      "obj-101",
      1
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
      "obj-102",
      0
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
      "obj-2",
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
      0
     ]
    }
   },
   {
    "patchline": {
     "source": [
      "obj-99",
      1
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
      "obj-99",
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
      "obj-99",
      1
     ],
     "destination": [
      "obj-107",
      0
     ]
    }
   }
  ],
  "parameters": {
   "obj-3": [
    "Gravity",
    "GRAVITY",
    0
   ],
   "obj-4": [
    "Bounce",
    "BOUNCE",
    0
   ],
   "obj-5": [
    "Swarm",
    "SWARM",
    0
   ],
   "obj-6": [
    "Erosion",
    "EROSION",
    0
   ],
   "obj-7": [
    "Mix",
    "MIX",
    0
   ],
   "obj-8": [
    "Grain",
    "GRAIN",
    0
   ],
   "obj-9": [
    "Heal",
    "HEAL",
    0
   ],
   "obj-10": [
    "Dose Rate",
    "RATE",
    0
   ],
   "obj-11": [
    "Dose Recover",
    "RECOVER",
    0
   ],
   "obj-12": [
    "Output",
    "OUTPUT",
    0
   ],
   "obj-13": [
    "Freeze",
    "FREEZE",
    0
   ],
   "obj-14": [
    "Sync",
    "SYNC",
    0
   ],
   "obj-15": [
    "Division",
    "DIVISION",
    0
   ],
   "obj-16": [
    "Wear Type",
    "WEAR TYPE",
    0
   ],
   "obj-17": [
    "Dose Target",
    "DOSE TARGET",
    0
   ],
   "obj-18": [
    "Dose Reset",
    "DOSE RESET",
    0
   ],
   "inherited_shortname": 1
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
