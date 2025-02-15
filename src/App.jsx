import { useState, useEffect } from "react";
import { AlertCircle, Save, Settings2 } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

const HyprlandSettings = () => {
  const [settings, setSettings] = useState({
    monitor: "monitor=,preferred,auto,1",
    kb_layout: "us",
    numlock_by_default: true,
    repeat_delay: 250,
    repeat_rate: 35,
    natural_scroll: true,
    scroll_factor: 0.5,
    follow_mouse: 1,
    scroll_event_delay: 0,
    workspace_swipe: true,
    workspace_swipe_distance: 700,
    workspace_swipe_fingers: 4,
    workspace_swipe_cancel_ratio: 0.2,
    workspace_swipe_min_speed_to_force: 5,
    workspace_swipe_direction_lock: true,
    workspace_swipe_direction_lock_threshold: 10,
    workspace_swipe_create_new: true,
    gaps_in: 2,
    gaps_out: 4,
    gaps_workspaces: 50,
    border_size: 1,
    active_border_color: "rgba(0DB7D4FF)",
    inactive_border_color: "rgba(31313600)",
    resize_on_border: true,
    no_focus_fallback: true,
    layout: "dwindle",
    allow_tearing: true,
    preserve_split: true,
    smart_split: false,
    smart_resizing: false,
    rounding: 0,
    blur_enabled: true,
    blur_xray: true,
    blur_special: false,
    blur_size: 5,
    blur_passes: 4,
    blur_brightness: 1.0,
    blur_noise: 0.01,
    blur_contrast: 1.0,
    dim_inactive: false,
    dim_strength: 0.1,
    animation_enabled: true,
    vfr: 1,
    vrr: 1,
    animate_manual_resizes: false,
    animate_mouse_windowdragging: false,
    enable_swallow: false,
    swallow_regex: "(foot|kitty|allacritty|Alacritty)",
    disable_hyprland_logo: true,
    force_default_wallpaper: 0,
    new_window_takes_over_fullscreen: 2,
    allow_session_lock_restore: true,
    plugin_hyprexpo_columns: 3,
    plugin_hyprexpo_gap_size: 5,
    plugin_hyprexpo_bg_col: "rgb(000000)",
    plugin_hyprexpo_workspace_method: "first 1",
    plugin_hyprexpo_enable_gesture: true,
    plugin_hyprexpo_gesture_distance: 300,
    plugin_hyprexpo_gesture_positive: false,
  });

  const [showSaved, setShowSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const loadedSettings = await invoke("read_settings");
      setSettings(loadedSettings);
      setError("");
    } catch (err) {
      setError("Failed to load settings: " + err);
    }
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await invoke("save_settings", { settings });
      setShowSaved(true);
      setError("");
      setTimeout(() => setShowSaved(false), 3000);
    } catch (err) {
      setError("Failed to save settings: " + err);
    }
  };

  const Nav = () => {
    return (
      <nav>
        <ul>
          <li>
            <h1>Sleex Control Center</h1>
          </li>
          <li>
            <button onClick={handleSave}>Save</button>
          </li>
        </ul>
      </nav>
    );
  };

  const SideLeft = () => {
    return (
      <div className="side-left">
        <ul>
          <li><a href="#monitor">Monitor configuration</a></li>
          <li><a href="#keyboard-mouse">Keyboard and Mouse</a></li>
          <li><a href="#binds">Binds</a></li>
          <li><a href="#gestures">Gestures</a></li>
          <li><a href="#general">General</a></li>
          <li><a href="#dwindle">Dwindle</a></li>
          <li><a href="#decorations">Decorations</a></li>
          <li><a href="#animations">Animations</a></li>
          <li><a href="#misc">Misc</a></li>
          <li><a href="#plugins">Plugins</a></li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Nav />
      <SideLeft />
      <div className="container">

        {error && (
          <div className="alert error">
            <AlertCircle className="alert-icon" />
            <div className="alert-content">
              <p className="alert-title">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {showSaved && (
          <div className="alert success">
            <AlertCircle className="alert-icon" />
            <div className="alert-content">
              <p className="alert-title">Success</p>
              <p>Settings saved successfully!</p>
            </div>
          </div>
        )}

        <div className="settings-card">
          <div className="settings-grid" id="monitor">
            <h1>Monitor configuration</h1>
            <div className="form-group">
              <label>Monitor</label>
              <input
                type="text"
                value={settings.monitor}
                onChange={(e) => handleChange("monitor", e.target.value)}
              />
            </div>
          </div>

          <div className="settings-grid" id="keyboard-mouse">
            <h1>Keyboard and Mouse</h1>
            <div className="form-group">
              <label>Keyboard Layout</label>
              <input
                type="text"
                value={settings.kb_layout}
                onChange={(e) => handleChange("kb_layout", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Repeat Delay</label>
              <input
                type="number"
                value={settings.repeat_delay}
                onChange={(e) =>
                  handleChange("repeat_delay", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Repeat Rate</label>
              <input
                type="number"
                value={settings.repeat_rate}
                onChange={(e) =>
                  handleChange("repeat_rate", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Scroll Factor</label>
              <input
                type="number"
                value={settings.scroll_factor}
                onChange={(e) =>
                  handleChange("scroll_factor", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Follow Mouse</label>
              <input
                type="number"
                value={settings.follow_mouse}
                onChange={(e) =>
                  handleChange("follow_mouse", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Numlock By Default</label>
              <input
                type="checkbox"
                checked={settings.numlock_by_default}
                onChange={(e) =>
                  handleChange("numlock_by_default", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Natural Scroll</label>
              <input
                type="checkbox"
                checked={settings.natural_scroll}
                onChange={(e) =>
                  handleChange("natural_scroll", e.target.checked)
                }
              />
            </div>
          </div>

          <div className="settings-grid" id="binds">
            <h1>Binds</h1>
            <div className="form-group">
              <label>Scroll Event Delay</label>
              <input
                type="number"
                value={settings.scroll_event_delay}
                onChange={(e) =>
                  handleChange("scroll_event_delay", parseInt(e.target.value))
                }
              />
            </div>
          </div>

          <div className="settings-grid" id="gestures">
            <h1>Gestures</h1>
            <div className="form-group">
              <label>Workspace Swipe Distance</label>
              <input
                type="number"
                value={settings.workspace_swipe_distance}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_distance",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Fingers</label>
              <input
                type="number"
                value={settings.workspace_swipe_fingers}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_fingers",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Cancel Ratio</label>
              <input
                type="number"
                value={settings.workspace_swipe_cancel_ratio}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_cancel_ratio",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Min Speed To Force</label>
              <input
                type="number"
                value={settings.workspace_swipe_min_speed_to_force}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_min_speed_to_force",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Direction Lock Threshold</label>
              <input
                type="number"
                value={settings.workspace_swipe_direction_lock_threshold}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_direction_lock_threshold",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe</label>
              <input
                type="checkbox"
                checked={settings.workspace_swipe}
                onChange={(e) =>
                  handleChange("workspace_swipe", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Direction Lock</label>
              <input
                type="checkbox"
                checked={settings.workspace_swipe_direction_lock}
                onChange={(e) =>
                  handleChange(
                    "workspace_swipe_direction_lock",
                    e.target.checked
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Workspace Swipe Create New</label>
              <input
                type="checkbox"
                checked={settings.workspace_swipe_create_new}
                onChange={(e) =>
                  handleChange("workspace_swipe_create_new", e.target.checked)
                }
              />
            </div>
          </div>

          <div className="settings-grid" id="general">
            <h1>General</h1>
            <div className="form-group">
              <label>Gaps In</label>
              <input
                type="number"
                value={settings.gaps_in}
                onChange={(e) =>
                  handleChange("gaps_in", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Gaps Out</label>
              <input
                type="number"
                value={settings.gaps_out}
                onChange={(e) =>
                  handleChange("gaps_out", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Gaps Workspaces</label>
              <input
                type="number"
                value={settings.gaps_workspaces}
                onChange={(e) =>
                  handleChange("gaps_workspaces", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Border Size</label>
              <input
                type="number"
                value={settings.border_size}
                onChange={(e) =>
                  handleChange("border_size", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Active Border Color</label>
              <input
                type="text"
                value={settings.active_border_color}
                onChange={(e) =>
                  handleChange("active_border_color", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Inactive Border Color</label>
              <input
                type="text"
                value={settings.inactive_border_color}
                onChange={(e) =>
                  handleChange("inactive_border_color", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Layout</label>
              <input
                type="text"
                value={settings.layout}
                onChange={(e) => handleChange("layout", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Resize On Border</label>
              <input
                type="checkbox"
                checked={settings.resize_on_border}
                onChange={(e) =>
                  handleChange("resize_on_border", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>No Focus Fallback</label>
              <input
                type="checkbox"
                checked={settings.no_focus_fallback}
                onChange={(e) =>
                  handleChange("no_focus_fallback", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Allow Tearing</label>
              <input
                type="checkbox"
                checked={settings.allow_tearing}
                onChange={(e) =>
                  handleChange("allow_tearing", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="settings-grid" id="dwindle">
            <div className="form-group">
              <h1>Dwindle</h1>
              <label>Preserve Split</label>
              <input
                type="checkbox"
                checked={settings.preserve_split}
                onChange={(e) =>
                  handleChange("preserve_split", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Smart Split</label>
              <input
                type="checkbox"
                checked={settings.smart_split}
                onChange={(e) => handleChange("smart_split", e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label>Smart Resizing</label>
              <input
                type="checkbox"
                checked={settings.smart_resizing}
                onChange={(e) =>
                  handleChange("smart_resizing", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="settings-grid" id="decorations">
            <h1>Decorations</h1>

            <div className="form-group">
              <label>Rounding</label>
              <input
                type="number"
                value={settings.rounding}
                onChange={(e) =>
                  handleChange("rounding", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Size</label>
              <input
                type="number"
                value={settings.blur_size}
                onChange={(e) =>
                  handleChange("blur_size", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Passes</label>
              <input
                type="number"
                value={settings.blur_passes}
                onChange={(e) =>
                  handleChange("blur_passes", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Brightness</label>
              <input
                type="number"
                value={settings.blur_brightness}
                onChange={(e) =>
                  handleChange("blur_brightness", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Noise</label>
              <input
                type="number"
                value={settings.blur_noise}
                onChange={(e) =>
                  handleChange("blur_noise", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Contrast</label>
              <input
                type="number"
                value={settings.blur_contrast}
                onChange={(e) =>
                  handleChange("blur_contrast", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Dim Strength</label>
              <input
                type="number"
                value={settings.dim_strength}
                onChange={(e) =>
                  handleChange("dim_strength", parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group">
              <label>Blur Enabled</label>
              <input
                type="checkbox"
                checked={settings.blur_enabled}
                onChange={(e) => handleChange("blur_enabled", e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label>Blur Xray</label>
              <input
                type="checkbox"
                checked={settings.blur_xray}
                onChange={(e) => handleChange("blur_xray", e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label>Blur Special</label>
              <input
                type="checkbox"
                checked={settings.blur_special}
                onChange={(e) => handleChange("blur_special", e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label>Dim Inactive</label>
              <input
                type="checkbox"
                checked={settings.dim_inactive}
                onChange={(e) => handleChange("dim_inactive", e.target.checked)}
              />
            </div>
          </div>
          <div className="settings-grid" id="animations">
            <div className="form-group">
              <h1>Animations</h1>
              <label>Animation Enabled</label>
              <input
                type="checkbox"
                checked={settings.animation_enabled}
                onChange={(e) =>
                  handleChange("animation_enabled", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="settings-grid" id="misc">
            <div className="form-group">
              <h1>Misc</h1>
              <label>VFR</label>
              <input
                type="number"
                value={settings.vfr}
                onChange={(e) => handleChange("vfr", parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>VRR</label>
              <input
                type="number"
                value={settings.vrr}
                onChange={(e) => handleChange("vrr", parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Swallow Regex</label>
              <input
                type="text"
                value={settings.swallow_regex}
                onChange={(e) => handleChange("swallow_regex", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Force Default Wallpaper</label>
              <input
                type="number"
                value={settings.force_default_wallpaper}
                onChange={(e) =>
                  handleChange(
                    "force_default_wallpaper",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>New Window Takes Over Fullscreen</label>
              <input
                type="number"
                value={settings.new_window_takes_over_fullscreen}
                onChange={(e) =>
                  handleChange(
                    "new_window_takes_over_fullscreen",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Animate Manual Resizes</label>
              <input
                type="checkbox"
                checked={settings.animate_manual_resizes}
                onChange={(e) =>
                  handleChange("animate_manual_resizes", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Animate Mouse Windowdragging</label>
              <input
                type="checkbox"
                checked={settings.animate_mouse_windowdragging}
                onChange={(e) =>
                  handleChange("animate_mouse_windowdragging", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Enable Swallow</label>
              <input
                type="checkbox"
                checked={settings.enable_swallow}
                onChange={(e) =>
                  handleChange("enable_swallow", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Disable Hyprland Logo</label>
              <input
                type="checkbox"
                checked={settings.disable_hyprland_logo}
                onChange={(e) =>
                  handleChange("disable_hyprland_logo", e.target.checked)
                }
              />
            </div>

            <div className="form-group">
              <label>Allow Session Lock Restore</label>
              <input
                type="checkbox"
                checked={settings.allow_session_lock_restore}
                onChange={(e) =>
                  handleChange("allow_session_lock_restore", e.target.checked)
                }
              />
            </div>
          </div>
          <div className="settings-grid" id="plugins">
            <div className="form-group">
              <h1>Plugins</h1>
              <label>Plugin Hyprexpo Columns</label>
              <input
                type="number"
                value={settings.plugin_hyprexpo_columns}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_columns",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo Gap Size</label>
              <input
                type="number"
                value={settings.plugin_hyprexpo_gap_size}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_gap_size",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo BG Col</label>
              <input
                type="text"
                value={settings.plugin_hyprexpo_bg_col}
                onChange={(e) =>
                  handleChange("plugin_hyprexpo_bg_col", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo Workspace Method</label>
              <input
                type="text"
                value={settings.plugin_hyprexpo_workspace_method}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_workspace_method",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo Gesture Distance</label>
              <input
                type="number"
                value={settings.plugin_hyprexpo_gesture_distance}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_gesture_distance",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo Enable Gesture</label>
              <input
                type="checkbox"
                checked={settings.plugin_hyprexpo_enable_gesture}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_enable_gesture",
                    e.target.checked
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Plugin Hyprexpo Gesture Positive</label>
              <input
                type="checkbox"
                checked={settings.plugin_hyprexpo_gesture_positive}
                onChange={(e) =>
                  handleChange(
                    "plugin_hyprexpo_gesture_positive",
                    e.target.checked
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HyprlandSettings;
