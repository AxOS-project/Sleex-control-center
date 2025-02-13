// src-tauri/src/main.rs
use std::fs;
use std::path::PathBuf;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HyprlandSettings {
    monitor: String,
    kb_layout: String,
    numlock_by_default: bool,
    repeat_delay: u32,
    repeat_rate: u32,
    natural_scroll: bool,
    scroll_factor: f32,
    follow_mouse: u32,
    scroll_event_delay: u32,
    workspace_swipe: bool,
    workspace_swipe_distance: u32,
    workspace_swipe_fingers: u32,
    workspace_swipe_cancel_ratio: f32,
    workspace_swipe_min_speed_to_force: u32,
    workspace_swipe_direction_lock: bool,
    workspace_swipe_direction_lock_threshold: u32,
    workspace_swipe_create_new: bool,
    gaps_in: u32,
    gaps_out: u32,
    gaps_workspaces: u32,
    border_size: u32,
    active_border_color: String,
    inactive_border_color: String,
    resize_on_border: bool,
    no_focus_fallback: bool,
    layout: String,
    allow_tearing: bool,
    preserve_split: bool,
    smart_split: bool,
    smart_resizing: bool,
    rounding: u32,
    blur_enabled: bool,
    blur_xray: bool,
    blur_special: bool,
    blur_size: u32,
    blur_passes: u32,
    blur_brightness: f32,
    blur_noise: f32,
    blur_contrast: f32,
    dim_inactive: bool,
    dim_strength: f32,
    animation_enabled: bool,
    vfr: u32,
    vrr: u32,
    animate_manual_resizes: bool,
    animate_mouse_windowdragging: bool,
    enable_swallow: bool,
    swallow_regex: String,
    disable_hyprland_logo: bool,
    force_default_wallpaper: u32,
    new_window_takes_over_fullscreen: u32,
    allow_session_lock_restore: bool,
    plugin_hyprexpo_columns: u32,
    plugin_hyprexpo_gap_size: u32,
    plugin_hyprexpo_bg_col: String,
    plugin_hyprexpo_workspace_method: String,
    plugin_hyprexpo_enable_gesture: bool,
    plugin_hyprexpo_gesture_distance: u32,
    plugin_hyprexpo_gesture_positive: bool,
}

fn get_config_path() -> PathBuf {
    let home = std::env::var("HOME").expect("Failed to get HOME directory");
    PathBuf::from(format!("{}/.config/hypr/custom/general.conf", home))
}

#[tauri::command]
async fn read_settings() -> Result<HyprlandSettings, String> {
    let config_path = get_config_path();
    let content = fs::read_to_string(&config_path)
        .map_err(|e| format!("Failed to read config: {}", e))?;
    
    // Default settings
    let mut settings = HyprlandSettings {
        // monitor
        monitor: "monitor=,preferred,auto,1".to_string(),
        // input
        kb_layout: "us".to_string(),
        numlock_by_default: true,
        repeat_delay: 250,
        repeat_rate: 35,
        natural_scroll: true,
        scroll_factor: 0.5,
        follow_mouse: 1,
        // binds
        scroll_event_delay: 0,
        // gestures
        workspace_swipe: true,
        workspace_swipe_distance: 700,
        workspace_swipe_fingers: 4,
        workspace_swipe_cancel_ratio: 0.2,
        workspace_swipe_min_speed_to_force: 5,
        workspace_swipe_direction_lock: true,
        workspace_swipe_direction_lock_threshold: 10,
        workspace_swipe_create_new: true,
        // general
        gaps_in: 2,
        gaps_out: 4,
        gaps_workspaces: 50,
        border_size: 1,
        active_border_color: "rgba(0DB7D4FF)".to_string(),
        inactive_border_color: "rgba(31313600)".to_string(),
        resize_on_border: true,
        no_focus_fallback: true,
        layout: "dwindle".to_string(),
        allow_tearing: true,
        // dwindle
        preserve_split: true,
        smart_split: false,
        smart_resizing: false,
        // decoration
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
        // animations
        animation_enabled: true,
        // misc
        vfr: 1,
        vrr: 1,
        animate_manual_resizes: false,
        animate_mouse_windowdragging: false,
        enable_swallow: false,
        swallow_regex: "(foot|kitty|allacritty|Alacritty)".to_string(),
        disable_hyprland_logo: true,
        force_default_wallpaper: 0,
        new_window_takes_over_fullscreen: 2,
        allow_session_lock_restore: true,
        // plugin hyprexpo
        plugin_hyprexpo_columns: 3,
        plugin_hyprexpo_gap_size: 5,
        plugin_hyprexpo_bg_col: "rgb(000000)".to_string(),
        plugin_hyprexpo_workspace_method: "first 1".to_string(),
        plugin_hyprexpo_enable_gesture: true,
        plugin_hyprexpo_gesture_distance: 300,
        plugin_hyprexpo_gesture_positive: false,
    };
    

    // Parse the config file and update settings
    for line in content.lines() {
        let parts: Vec<&str> = line.split('=').collect();
        if parts.len() == 2 {
            let key = parts[0].trim();
            let value = parts[1].trim();
            
            match key {
                // monitor
                "monitor" => settings.monitor = value.to_string(),
            
                // input
                "input:kb_layout" => settings.kb_layout = value.to_string(),
                "input:numlock_by_default" => settings.numlock_by_default = value.parse().unwrap_or(true),
                "input:repeat_delay" => settings.repeat_delay = value.parse().unwrap_or(250),
                "input:repeat_rate" => settings.repeat_rate = value.parse().unwrap_or(35),
                "input:natural_scroll" => settings.natural_scroll = value.parse().unwrap_or(true),
                "input:scroll_factor" => settings.scroll_factor = value.parse().unwrap_or(0.5),
                "input:follow_mouse" => settings.follow_mouse = value.parse().unwrap_or(1),
            
                // binds
                "binds:scroll_event_delay" => settings.scroll_event_delay = value.parse().unwrap_or(0),
            
                // gestures
                "gestures:workspace_swipe" => settings.workspace_swipe = value.parse().unwrap_or(true),
                "gestures:workspace_swipe_distance" => settings.workspace_swipe_distance = value.parse().unwrap_or(700),
                "gestures:workspace_swipe_fingers" => settings.workspace_swipe_fingers = value.parse().unwrap_or(4),
                "gestures:workspace_swipe_cancel_ratio" => settings.workspace_swipe_cancel_ratio = value.parse().unwrap_or(0.2),
                "gestures:workspace_swipe_min_speed_to_force" => settings.workspace_swipe_min_speed_to_force = value.parse().unwrap_or(5),
                "gestures:workspace_swipe_direction_lock" => settings.workspace_swipe_direction_lock = value.parse().unwrap_or(true),
                "gestures:workspace_swipe_direction_lock_threshold" => settings.workspace_swipe_direction_lock_threshold = value.parse().unwrap_or(10),
                "gestures:workspace_swipe_create_new" => settings.workspace_swipe_create_new = value.parse().unwrap_or(true),
            
                // general
                "general:gaps_in" => settings.gaps_in = value.parse().unwrap_or(2),
                "general:gaps_out" => settings.gaps_out = value.parse().unwrap_or(4),
                "general:gaps_workspaces" => settings.gaps_workspaces = value.parse().unwrap_or(50),
                "general:border_size" => settings.border_size = value.parse().unwrap_or(1),
                "general:active_border_color" => settings.active_border_color = value.to_string(),
                "general:inactive_border_color" => settings.inactive_border_color = value.to_string(),
                "general:resize_on_border" => settings.resize_on_border = value.parse().unwrap_or(true),
                "general:no_focus_fallback" => settings.no_focus_fallback = value.parse().unwrap_or(true),
                "general:layout" => settings.layout = value.to_string(),
                "general:allow_tearing" => settings.allow_tearing = value.parse().unwrap_or(true),
            
                // dwindle
                "dwindle:preserve_split" => settings.preserve_split = value.parse().unwrap_or(true),
                "dwindle:smart_split" => settings.smart_split = value.parse().unwrap_or(false),
                "dwindle:smart_resizing" => settings.smart_resizing = value.parse().unwrap_or(false),
            
                // decoration
                "decoration:rounding" => settings.rounding = value.parse().unwrap_or(0),
                "decoration:blur_enabled" => settings.blur_enabled = value.parse().unwrap_or(true),
                "decoration:blur_xray" => settings.blur_xray = value.parse().unwrap_or(true),
                "decoration:blur_special" => settings.blur_special = value.parse().unwrap_or(false),
                "decoration:blur_size" => settings.blur_size = value.parse().unwrap_or(5),
                "decoration:blur_passes" => settings.blur_passes = value.parse().unwrap_or(4),
                "decoration:blur_brightness" => settings.blur_brightness = value.parse().unwrap_or(1.0),
                "decoration:blur_noise" => settings.blur_noise = value.parse().unwrap_or(0.01),
                "decoration:blur_contrast" => settings.blur_contrast = value.parse().unwrap_or(1.0),
                "decoration:dim_inactive" => settings.dim_inactive = value.parse().unwrap_or(false),
                "decoration:dim_strength" => settings.dim_strength = value.parse().unwrap_or(0.1),
            
                // animations
                "animations:enabled" => settings.animation_enabled = value.parse().unwrap_or(true),
                "animations:vfr" => settings.vfr = value.parse().unwrap_or(1),
                "animations:vrr" => settings.vrr = value.parse().unwrap_or(1),
            
                // misc
                "misc:animate_manual_resizes" => settings.animate_manual_resizes = value.parse().unwrap_or(false),
                "misc:animate_mouse_windowdragging" => settings.animate_mouse_windowdragging = value.parse().unwrap_or(false),
                "misc:enable_swallow" => settings.enable_swallow = value.parse().unwrap_or(false),
                "misc:swallow_regex" => settings.swallow_regex = value.to_string(),
                "misc:disable_hyprland_logo" => settings.disable_hyprland_logo = value.parse().unwrap_or(true),
                "misc:force_default_wallpaper" => settings.force_default_wallpaper = value.parse().unwrap_or(0),
                "misc:new_window_takes_over_fullscreen" => settings.new_window_takes_over_fullscreen = value.parse().unwrap_or(2),
                "misc:allow_session_lock_restore" => settings.allow_session_lock_restore = value.parse().unwrap_or(true),
            
                // plugin hyprexpo
                "plugin:hyprexpo_columns" => settings.plugin_hyprexpo_columns = value.parse().unwrap_or(3),
                "plugin:hyprexpo_gap_size" => settings.plugin_hyprexpo_gap_size = value.parse().unwrap_or(5),
                "plugin:hyprexpo_bg_col" => settings.plugin_hyprexpo_bg_col = value.to_string(),
                "plugin:hyprexpo_workspace_method" => settings.plugin_hyprexpo_workspace_method = value.to_string(),
                "plugin:hyprexpo_enable_gesture" => settings.plugin_hyprexpo_enable_gesture = value.parse().unwrap_or(true),
                "plugin:hyprexpo_gesture_distance" => settings.plugin_hyprexpo_gesture_distance = value.parse().unwrap_or(300),
                "plugin:hyprexpo_gesture_positive" => settings.plugin_hyprexpo_gesture_positive = value.parse().unwrap_or(false),
            
                _ => {}
            }
        }
    }

    Ok(settings)
}

#[tauri::command]
async fn save_settings(settings: HyprlandSettings) -> Result<(), String> {
    let config_path = get_config_path();
    
    // Create config content
    let content = format!(
        "monitor = {}

input {{
    kb_layout = {}
    numlock_by_default = {}
    repeat_delay = {}
    repeat_rate = {}
    natural_scroll = {}
    scroll_factor = {}
    follow_mouse = {}
}}

binds {{
    scroll_event_delay = {}
}}

gestures {{
    workspace_swipe = {}
    workspace_swipe_distance = {}
    workspace_swipe_fingers = {}
    workspace_swipe_cancel_ratio = {}
    workspace_swipe_min_speed_to_force = {}
    workspace_swipe_direction_lock = {}
    workspace_swipe_direction_lock_threshold = {}
    workspace_swipe_create_new = {}
}}

general {{
    gaps_in = {}
    gaps_out = {}
    gaps_workspaces = {}
    border_size = {}
    col.active_border = {}
    col.inactive_border = {}
    resize_on_border = {}
    no_focus_fallback = {}
    layout = {}
    allow_tearing = {}
}}

dwindle {{
    preserve_split = {}
    smart_split = {}
    smart_resizing = {}
}}

decoration {{
    rounding = {}
    blur {{
        enabled = {}
        xray = {}
        special = {}
        size = {}
        passes = {}
        brightness = {}
        noise = {}
        contrast = {}
    }}
    dim_inactive = {}
    dim_strength = {}
}}

animations {{
    enabled = {}
}}

misc {{
    vfr = {}
    vrr = {}
    animate_manual_resizes = {}
    animate_mouse_windowdragging = {}
    enable_swallow = {}
    swallow_regex = {}
    disable_hyprland_logo = {}
    force_default_wallpaper = {}
    new_window_takes_over_fullscreen = {}
    allow_session_lock_restore = {}
}}

plugin {{
    hyprexpo {{
        columns = {}
        gap_size = {}
        bg_col = {}
        workspace_method = {}
        enable_gesture = {}
        gesture_distance = {}
        gesture_positive = {}
    }}
}}",
        settings.monitor,
        settings.kb_layout,
        settings.numlock_by_default,
        settings.repeat_delay,
        settings.repeat_rate,
        settings.natural_scroll,
        settings.scroll_factor,
        settings.follow_mouse,
        settings.scroll_event_delay,
        settings.workspace_swipe,
        settings.workspace_swipe_distance,
        settings.workspace_swipe_fingers,
        settings.workspace_swipe_cancel_ratio,
        settings.workspace_swipe_min_speed_to_force,
        settings.workspace_swipe_direction_lock,
        settings.workspace_swipe_direction_lock_threshold,
        settings.workspace_swipe_create_new,
        settings.gaps_in,
        settings.gaps_out,
        settings.gaps_workspaces,
        settings.border_size,
        settings.active_border_color,
        settings.inactive_border_color,
        settings.resize_on_border,
        settings.no_focus_fallback,
        settings.layout,
        settings.allow_tearing,
        settings.preserve_split,
        settings.smart_split,
        settings.smart_resizing,
        settings.rounding,
        settings.blur_enabled,
        settings.blur_xray,
        settings.blur_special,
        settings.blur_size,
        settings.blur_passes,
        settings.blur_brightness,
        settings.blur_noise,
        settings.blur_contrast,
        settings.dim_inactive,
        settings.dim_strength,
        settings.animation_enabled,
        settings.vfr,
        settings.vrr,
        settings.animate_manual_resizes,
        settings.animate_mouse_windowdragging,
        settings.enable_swallow,
        settings.swallow_regex,
        settings.disable_hyprland_logo,
        settings.force_default_wallpaper,
        settings.new_window_takes_over_fullscreen,
        settings.allow_session_lock_restore,
        settings.plugin_hyprexpo_columns,
        settings.plugin_hyprexpo_gap_size,
        settings.plugin_hyprexpo_bg_col,
        settings.plugin_hyprexpo_workspace_method,
        settings.plugin_hyprexpo_enable_gesture,
        settings.plugin_hyprexpo_gesture_distance,
        settings.plugin_hyprexpo_gesture_positive
    );

    // Write to file
    fs::write(&config_path, content)
        .map_err(|e| format!("Failed to write config: {}", e))?;

    // Optionally reload Hyprland config
    std::process::Command::new("hyprctl")
        .arg("reload")
        .output()
        .map_err(|e| format!("Failed to reload Hyprland: {}", e))?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_settings, save_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}