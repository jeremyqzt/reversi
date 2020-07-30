from datetime import datetime
import time

class timer:
    @staticmethod
    def getCurrent():
        now = datetime.now()
        timestamp = datetime.timestamp(now)
        return timestamp

    @staticmethod
    def getDifference(last):
        now = datetime.now()
        timestamp = datetime.timestamp(now)
        return timestamp - last