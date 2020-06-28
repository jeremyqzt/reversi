from django.db import models

class Game(models.Model):
    gid = models.CharField(max_length=32)
    pid = models.CharField(max_length=32)
    moveX = models.IntegerField()
    moveY = models.IntegerField()
    moveTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.gid

    def save(self):
        pass
    
    def get_queryset(self):
        print("Overwritten")
        pass