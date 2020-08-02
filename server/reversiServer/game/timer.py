from datetime import datetime
import time

class ReversiTimer:
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

    @staticmethod
    def isTimedOut(remaining):
        if (0 >= remaining):
            return True