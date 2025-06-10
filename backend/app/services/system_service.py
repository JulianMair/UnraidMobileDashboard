import psutil

def get_system_info():
    return {
        "cpu_usage": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory()._asdict(),
        "disk_usage": psutil.disk_usage('/')._asdict(),
        "uptime": psutil.boot_time()
    }
