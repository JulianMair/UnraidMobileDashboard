import psutil


def bytes_to_gb(b):
    return round(b / (1024**3), 2)

def get_disks_info():
    ignore_mounts = ['tmpfs', 'devtmpfs', 'proc', 'sysfs', 'devfs', 'overlay']  # Filesystemtypen ignorieren
    ignore_points = ['/boot', '/run', '/snap', '/var/lib/docker']  # Mountpoints ignorieren

    disk_infos = []
    for p in psutil.disk_partitions(all=False):
        if p.fstype.lower() in ignore_mounts:
            continue
        if any(p.mountpoint.startswith(path) for path in ignore_points):
            continue
        try:
            usage = psutil.disk_usage(p.mountpoint)
            disk_infos.append({
                "mountpoint": p.mountpoint,
                "device": p.device,
                "fstype": p.fstype,
                "total_gb": round(usage.total / (1024**3), 2),
                "used_gb": round(usage.used / (1024**3), 2),
                "free_gb": round(usage.free / (1024**3), 2),
                "percent_used": usage.percent
            })
        except PermissionError:
            continue  # Falls Zugriff verweigert wird
    return disk_infos

def get_system_info():
    
    memory = psutil.virtual_memory()._asdict()
    disks = get_disks_info()
    
    return {
        "cpu_usage": psutil.cpu_percent(interval=1),
        "cpu_usage_per_core": psutil.cpu_percent(interval=1, percpu=True),
        "memory_total": bytes_to_gb(memory['total']),
        "memory_free": bytes_to_gb(memory['total']-memory['available']),
        "memory_available": bytes_to_gb(memory['available']),
        "disks": disks,
        "uptime": psutil.boot_time()
        
    }
